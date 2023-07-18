import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/Shared/entities/package.entity';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { User } from '../entities/user.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Package, User]),
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
  })],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
