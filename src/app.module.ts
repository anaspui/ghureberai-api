import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseModule } from './Shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
