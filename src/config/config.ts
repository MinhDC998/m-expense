export const configuration = () => ({
  port: process.env.PORT || 3000,
  db: {
    type: process.env.DB_TYPE,
    synchronize: false,
    logging: true,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
