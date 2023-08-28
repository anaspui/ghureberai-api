import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { sessionConfig } from "./Shared/auth/session.config";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors({
		origin: "http://localhost:4000",
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	app.use(session(sessionConfig));
	await app.listen(3000);
}
bootstrap();
