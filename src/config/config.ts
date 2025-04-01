export const configuration = () => ({
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'app',
    options: {
      autoIndex: true,
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('DB connected');
        });
        return connection;
      },
    },
  },
});
