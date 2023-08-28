import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import { sessionConfig } from "./Shared/auth/session.config";
import { AppModule } from "./app.module";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors({
		origin: "http://localhost:3000",
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	app.use(session(sessionConfig));
	await app.listen(4000);
}
bootstrap();
