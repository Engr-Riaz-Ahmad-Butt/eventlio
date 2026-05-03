import { Module } from '@nestjs/common';
import { VendorPackagesController } from './vendor-packages.controller';
import { VendorPackagesService } from './vendor-packages.service';

@Module({
  controllers: [VendorPackagesController],
  providers: [VendorPackagesService]
})
export class VendorPackagesModule {}
