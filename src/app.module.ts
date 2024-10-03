import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ UserModule, DbModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
