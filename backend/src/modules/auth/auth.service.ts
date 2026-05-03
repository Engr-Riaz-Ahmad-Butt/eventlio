import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import {
  RegisterDto,
  LoginDto,
  VerifyOtpDto,
  ResendOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  RefreshTokenDto,
} from './dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // ── Register ──────────────────────────────────────────────────

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    if (dto.phone) {
      const phoneExists = await this.prisma.user.findUnique({
        where: { phone: dto.phone },
      });
      if (phoneExists) {
        throw new ConflictException('Phone number already registered');
      }
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const otp = this.generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const role = dto.role === Role.VENDOR_OWNER ? Role.VENDOR_OWNER : Role.CLIENT;

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        role,
        otp,
        otpExpiresAt,
        onboardingStep: role === Role.VENDOR_OWNER ? 'vendor-onboarding' : 'client-onboarding',
      },
    });

    // Create profile based on role
    if (role === Role.CLIENT) {
      await this.prisma.clientProfile.create({
        data: { userId: user.id },
      });
    }

    // TODO: Send OTP via email/WhatsApp
    this.logger.log(`OTP for ${dto.email}: ${otp}`);

    return {
      message: 'Registration successful. Please verify your email with the OTP sent.',
      userId: user.id,
      email: user.email,
    };
  }

  // ── Verify OTP ────────────────────────────────────────────────

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { vendorProfile: true, clientProfile: true },
    });

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    if (!user.otp || !user.otpExpiresAt) {
      throw new BadRequestException('No OTP request found');
    }

    if (new Date() > user.otpExpiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    if (user.otp !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        otp: null,
        otpExpiresAt: null,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const verifiedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { vendorProfile: true, clientProfile: true },
    });

    return {
      message: 'Email verified successfully',
      ...tokens,
      user: this.sanitizeUser(verifiedUser),
    };
  }

  async resendOtp(dto: ResendOtpDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: 'If this email exists, a new OTP has been sent.' };
    }

    if (user.isEmailVerified) {
      return { message: 'This email is already verified.' };
    }

    const otp = this.generateOtp();
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        otp,
        otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    this.logger.log(`Resent OTP for ${dto.email}: ${otp}`);

    return { message: 'If this email exists, a new OTP has been sent.' };
  }

  // ── Login ─────────────────────────────────────────────────────

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { vendorProfile: true, clientProfile: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      // Resend OTP
      const otp = this.generateOtp();
      await this.prisma.user.update({
        where: { id: user.id },
        data: { otp, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) },
      });
      this.logger.log(`OTP for ${dto.email}: ${otp}`);

      throw new UnauthorizedException(
        'Email not verified. A new OTP has been sent.',
      );
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    const freshUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { vendorProfile: true, clientProfile: true },
    });

    return {
      message: 'Login successful',
      ...tokens,
      user: this.sanitizeUser(freshUser),
    };
  }

  // ── Forgot Password ──────────────────────────────────────────

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If this email exists, an OTP has been sent.' };
    }

    const otp = this.generateOtp();
    await this.prisma.user.update({
      where: { id: user.id },
      data: { otp, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    });

    // TODO: Send OTP via email
    this.logger.log(`Password reset OTP for ${dto.email}: ${otp}`);

    return { message: 'If this email exists, an OTP has been sent.' };
  }

  // ── Reset Password ───────────────────────────────────────────

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.otp || !user.otpExpiresAt) {
      throw new BadRequestException('Invalid request');
    }

    if (new Date() > user.otpExpiresAt) {
      throw new BadRequestException('OTP has expired');
    }

    if (user.otp !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 12);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        otp: null,
        otpExpiresAt: null,
      },
    });

    return { message: 'Password reset successful' };
  }

  // ── Refresh Token ─────────────────────────────────────────────

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { vendorProfile: true, clientProfile: true },
      });

      if (!user || user.refreshToken !== dto.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user.id, user.email, user.role);
      const freshUser = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: { vendorProfile: true, clientProfile: true },
      });

      return { ...tokens, user: this.sanitizeUser(freshUser) };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return { message: 'Logged out successfully' };
  }

  // ── Get Current User ──────────────────────────────────────────

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        vendorProfile: true,
        clientProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitizeUser(user);
  }

  // ── Helpers ───────────────────────────────────────────────────

  private async generateTokens(userId: string, email: string, role: Role) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
      }),
    ]);

    // Store refresh token hash
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private sanitizeUser(user: any) {
    if (!user) return null;
    const { passwordHash, otp, otpExpiresAt, refreshToken, ...sanitized } = user;
    return sanitized;
  }
}
