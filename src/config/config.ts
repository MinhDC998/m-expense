export const configuration = () => ({
  port: process.env.PORT || 3000,
  db: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadModels: false,
    synchronize: false,
    logging: true,
    models: [`${__dirname}/../models`],
  },
});
