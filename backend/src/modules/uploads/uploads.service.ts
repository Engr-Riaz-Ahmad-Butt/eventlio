import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class UploadsService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'eventlio',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
