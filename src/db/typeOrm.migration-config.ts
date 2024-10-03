import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from './entities/user.entity';

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false
}

export default new DataSource(dataSourceOptions);