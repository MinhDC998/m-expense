import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseConnection = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    const dbConfig = config.get('db');
    const { username, password, host, port, database, authSource } = dbConfig;
    const uri = `mongodb://${username && password ? `${username}:${password}@` : ''}${host}:${port}/${database}${authSource ? `?authSource=${authSource}` : ''}`;

    return {
      uri,
      ...dbConfig.options,
    };
  },
  inject: [ConfigService],
});
