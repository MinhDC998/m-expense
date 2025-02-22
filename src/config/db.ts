import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    return config.get('db');
  },
  inject: [ConfigService],
});
