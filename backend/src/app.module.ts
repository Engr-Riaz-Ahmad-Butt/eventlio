import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './database';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard, RolesGuard } from './common/guards';
import { GlobalExceptionFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptors';
import { CategoriesModule } from './modules/categories/categories.module';
import { VendorProfilesModule } from './modules/vendor-profiles/vendor-profiles.module';
import { VendorPackagesModule } from './modules/vendor-packages/vendor-packages.module';
import { VendorGalleryModule } from './modules/vendor-gallery/vendor-gallery.module';
import { ServiceAreasModule } from './modules/service-areas/service-areas.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 100, // 100 requests per TTL
      },
    ]),

    // Database
    DatabaseModule,

    // Feature modules
    AuthModule,
    UsersModule,
    CategoriesModule,
    VendorProfilesModule,
    VendorPackagesModule,
    VendorGalleryModule,
    ServiceAreasModule,
    UploadsModule,
    MarketplaceModule,
  ],
  providers: [
    // Global JWT Auth Guard — all routes protected by default
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Global Roles Guard
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // Global Rate Limiting
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    // Global Response Transform
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
