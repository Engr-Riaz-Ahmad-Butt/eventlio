import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto } from './dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        vendorProfile: {
            description: string | null;
            phone: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            city: string;
            address: string | null;
            userId: string;
            businessName: string;
            slug: string;
            tagline: string | null;
            whatsappNumber: string | null;
            instagramUrl: string | null;
            facebookUrl: string | null;
            websiteUrl: string | null;
            coverImage: string | null;
            logo: string | null;
            isVerified: boolean;
            isFeatured: boolean;
            status: import("@prisma/client").$Enums.VendorStatus;
            avgRating: number;
            totalReviews: number;
        } | null;
        clientProfile: {
            phone: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            city: string | null;
            address: string | null;
            userId: string;
        } | null;
        name: string;
        email: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        avatar: string | null;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        id: string;
        avatar: string | null;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            name: string;
            email: string;
            phone: string | null;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            isEmailVerified: boolean;
            createdAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
