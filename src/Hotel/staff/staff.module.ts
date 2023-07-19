import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { staffController } from './staff.controller';
import { staffService } from './staff.service';
import { staff } from 'src/Shared/entities/staff.entity';
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports: [TypeOrmModule.forFeature([staff]),
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
    controllers: [staffController],
    providers: [staffService],
  })
  export class staffModule {}