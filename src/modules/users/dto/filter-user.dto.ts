import { ApiProperty } from '@nestjs/swagger';

import { TFindUserDto } from '@/modules/users/users.types';

export class FindUserDto implements TFindUserDto {
  @ApiProperty({
    description: 'Find by name or email',
    required: false,
  })
  keyword: string;
}

export class UploadAvatar {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  file: any;
}
