import { Module } from '@nestjs/common';
import { VendorGalleryController } from './vendor-gallery.controller';
import { VendorGalleryService } from './vendor-gallery.service';

@Module({
  controllers: [VendorGalleryController],
  providers: [VendorGalleryService]
})
export class VendorGalleryModule {}
