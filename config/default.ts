export default {
  api: {
    protocol: 'http',
    host: 'localhost',
    port: 3035,
    prefix: '/v1',
  },
  auth: {
    secret: '5yrwKNU8B9FpGYmx',
    expireIn: 43200,
    encryption: {
      algorithm: 'aes-128-cbc',
      secret: 'Q4EwKz4fePbVFLaL',
    },
  },
  db: {
    pg: {
      name: 'default',
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'dbuser',
      password: 'dbuser_password',
      database: 'db_name',
      entities: [
        'src/**/**.entity.ts',
        'src/**/**.entity.js',
        '**/**.entity.ts',
        '**/**.entity.js',
      ],
    },
  },
  logger: {
    winston: {
      colorConsoleLogEnable: true,
      transports: [{
        name: 'console',
        enabled: true,
      },
      {
        name: 'file',
        enabled: false,
      }],
    },
  },
};
