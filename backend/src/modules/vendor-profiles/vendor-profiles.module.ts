import { Module } from '@nestjs/common';
import { VendorProfilesController } from './vendor-profiles.controller';
import { VendorProfilesService } from './vendor-profiles.service';

@Module({
  controllers: [VendorProfilesController],
  providers: [VendorProfilesService]
})
export class VendorProfilesModule {}
