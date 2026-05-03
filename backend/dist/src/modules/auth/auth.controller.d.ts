import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto, RefreshTokenDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
        email: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: any;
        accessToken: string;
        refreshToken: string;
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
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
}
