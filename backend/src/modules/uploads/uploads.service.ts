import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'eventlio',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      const base64 = file.buffer.toString('base64');
      return {
        secure_url: `data:${file.mimetype};base64,${base64}`,
        public_id: `${folder}/${Date.now()}-${file.originalname}`,
      } as UploadApiResponse;
    }

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          if (!result) {
            return reject(new BadRequestException('Upload failed'));
          }
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
