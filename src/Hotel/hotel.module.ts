import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { Hotel } from 'src/Shared/entities/hotel.entity';
import { staffModule } from './staff/staff.module';
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
  TypeOrmModule.forFeature([Hotel]), staffModule,
  MailerModule.forRoot({
    transport: {
      host: "smtp.gmail.com",
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: "omarmohammad.anas@gmail.com",
        pass: "doruxfrlcixtwomr",
      },
    },
  }),

],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
