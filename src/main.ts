import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { sessionConfig } from "./Shared/auth/session.config";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
const cors = require("cors");
const express = require("express");
const app = express();
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	// app.enableCors({
	// 	origin: "http://localhost:3000",
	// 	credentials: true,
	// });
	app.use(express.json());
	app.use(
		cors({
			origin: "http://localhost:3000", // Change this to your frontend URL
			credentials: true, // Allow credentials (cookies, in this case)
		}),
	);
	app.useGlobalPipes(new ValidationPipe());
	app.use(session(sessionConfig));
	// await app.listen(3001);
	await app.listen(process.env.PORT || 8000);
}
bootstrap();
