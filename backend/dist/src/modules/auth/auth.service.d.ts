import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto, LoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, RefreshTokenDto } from './dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
        email: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        user: any;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: any;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    refreshToken(dto: RefreshTokenDto): Promise<{
        user: any;
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: string): Promise<any>;
    private generateTokens;
    private generateOtp;
    private sanitizeUser;
}
