import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsInt, Min, Max } from 'class-validator';
import { TCreateUserDto, TFindUserDto, TLogin } from '../types';

export class CreateUserDto implements TCreateUserDto {
  @ApiProperty()
  @IsString({ message: 'firstName must be a string' })
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  firstKana: string;

  @ApiProperty()
  lastKana: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  studentNumber: string;

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

  @ApiProperty({ required: false })
  @IsEmail()
  email?: string;
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
  email: string;

  @ApiProperty()
  password: string;
}
