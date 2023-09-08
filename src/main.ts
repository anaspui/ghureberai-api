import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { sessionConfig } from "./Shared/auth/session.config";
import * as cookieParser from "cookie-parser";
import * as process from "process";
// const cors = require("cors");
const express = require("express");
// :TODO: Remove this line
const app = express();
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.enableCors({
		origin: "http://localhost:4000",
		credentials: true,
	});
	app.use(express.json());
	// app.use(cors());
	// app.useGlobalPipes(new ValidationPipe());
	app.use(session(sessionConfig));
	// await app.listen(3001);
	await app.listen(8000);
}
bootstrap();
