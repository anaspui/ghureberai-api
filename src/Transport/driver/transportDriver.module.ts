import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "src/Shared/entities/driver.entity";
import { TransportDriverController } from "./transportDriver.controller";
import { TransportDriverService } from "./transportDriver.service";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports: [
        TypeOrmModule.forFeature([Driver]),
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
    controllers:[TransportDriverController],
    providers:[TransportDriverService]
})
export class TransportDriverModule{}