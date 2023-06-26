import { Module } from '@nestjs/common';
import { DatabaseModule } from './Shared/database/database.module';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [DatabaseModule, CustomerModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
