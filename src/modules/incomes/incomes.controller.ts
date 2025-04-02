import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { IncomeService } from './incomes.service';
import { CreateIncomeDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';

@ApiTags('incomes')
@Controller('incomes')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
export class IncomesController {
  private readonly logger = new Logger(IncomesController.name);

  constructor(private incomeService: IncomeService) {}

  @Post()
  async register(@Body() body: CreateIncomeDto) {
    console.log(body);
    return this.incomeService.create(body);
  }
}
