import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: () => ({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/entities/**'],
            migrations: [__dirname + '/migrations/*.ts'],
            synchronize: false 
        })
    })],
})
export class DbModule {}
