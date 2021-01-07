import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'edusatelis',
  password: '448171',
  database: 'mash',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
