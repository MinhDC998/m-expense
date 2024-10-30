import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiBodyOptions, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

export function FileUpload(inputName: string, apiBody?: ApiBodyOptions) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody(apiBody),
    UseInterceptors(
      FileInterceptor(inputName, {
        storage: diskStorage({
          filename: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname);
          },
        }),
      }),
    ),
  );
}
