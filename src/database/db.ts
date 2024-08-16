import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

const { DB_TYPE, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } =
  process.env;

export default SequelizeModule.forRoot({
  dialect: (DB_TYPE || 'mysql') as Dialect,
  host: DB_HOST || 'localhost',
  port: +DB_PORT || 3306,
  username: DB_USERNAME || 'user',
  password: DB_PASSWORD || '',
  database: DB_NAME || 'sample_test',
  synchronize: true,
  autoLoadModels: true,
});
