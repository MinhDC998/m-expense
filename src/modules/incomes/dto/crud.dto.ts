import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

import { TValueof } from '@/common/types/common';
import { I18nTranslations } from '@/i18n/i18n.generated';

import { TCreateIncomeDTO } from '../incomes.types';
import { CURRENCY } from '@/common/constants/common';

export class CreateIncomeDto implements TCreateIncomeDTO {
  @ApiProperty()
  @IsNumber(
    { allowInfinity: false },
    {
      message: i18nValidationMessage<I18nTranslations>('validation.string', {
        field: 'value',
      }),
    },
  )
  value: number;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.string', {
      field: 'lastName',
    }),
  })
  type: string;

  @ApiProperty()
  @IsOptional()
  incomePeriod: string;

  @ApiProperty()
  @Length(6, 20, {
    message: 'Password must be between 6 and 20 characters long',
  })
  from: string;

  @ApiProperty({
    enum: CURRENCY,
  })
  currency: TValueof<typeof CURRENCY>;
}
