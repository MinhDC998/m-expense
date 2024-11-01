import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';
import { TCreateUserDto, TFindUserDto, TLogin } from '../../types/users.types';
import { TValueof } from '@/types/common';
import { ROLES } from '@/constants/roles';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/i18n/i18n.generated';

export class CreateUserDto implements TCreateUserDto {
  @ApiProperty()
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.string', {
      field: 'firstName',
    }),
  })
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.string', {
      field: 'lastName',
    }),
  })
  lastName: string;

  @ApiProperty()
  @IsOptional()
  status: string;

  @ApiProperty()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters long',
  })
  password: string;

  @ApiProperty()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters long',
  })
  confirmPassword: string;

  @ApiProperty()
  @IsEmail(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>('validation.email', {
        email: 'email',
      }),
    },
  )
  @IsOptional()
  email: string;

  @ApiProperty({
    enum: ROLES,
  })
  @IsString()
  role: TValueof<typeof ROLES>;
}

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

export class LoginDto implements TLogin {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
