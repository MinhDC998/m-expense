import { ApiProperty } from '@nestjs/swagger';
import { TAdmin } from '../types';
import { IsNumber, IsString } from 'class-validator';

export class CreateAdminDTO
  implements Pick<TAdmin & { createdBy: number }, 'organization' | 'createdBy'>
{
  @ApiProperty()
  @IsString()
  organization: string;

  @ApiProperty()
  @IsNumber()
  createdBy: number;
}
