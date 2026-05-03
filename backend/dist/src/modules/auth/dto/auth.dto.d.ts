import { Role } from '@prisma/client';
export declare class RegisterDto {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role?: Role;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class VerifyOtpDto {
    email: string;
    otp: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    otp: string;
    newPassword: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
