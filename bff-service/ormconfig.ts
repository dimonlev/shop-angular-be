import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  // uncomment this lines if you want to start app with remote DB
  // host: process.env.PG_HOST,
  // username: process.env.PG_USERNAME,
  // password: process.env.PG_PASSWORD,
  // database: process.env.PG_DATABASE,

  // uncomment this line if you want to start app if docker containers
  host: 'db',

  // uncomment this line if you want to start app with local db
  // host: 'localhost',

  port: 5432,
  username: 'admin',
  password: '620602',
  database: 'test2',
  synchronize: false,
  entities: ['src/entity/**/*.ts'],
  // dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: ['warn', 'error'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = connectionOptions;
