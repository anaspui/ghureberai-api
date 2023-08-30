import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { sessionConfig } from "./Shared/auth/session.config";
import * as cookieParser from "cookie-parser";
import * as process from "process";
import { Request, Response } from "express";
const cors = require("cors");
const express = require("express");
const app = express();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.use(express.json());

	app.use((req: Request, res: Response, next: Function) => {
		const allowedOrigins = [
			"http://localhost:3000",
			"https://ghureberai-a8umtdtbz-anaspui.vercel.app",
		];
		const origin = req.headers.origin as string;

		if (allowedOrigins.includes(origin)) {
			res.header("Access-Control-Allow-Origin", origin);
			res.header("Access-Control-Allow-Credentials", "true");
		}

		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept",
		);
		next();
	});

	app.use(session(sessionConfig));

	await app.listen(process.env.PORT || 8000);
}

bootstrap();

////////////
// const cors = require("cors");
// const express = require("express");
// const app = express();
// async function bootstrap() {
// 	const app = await NestFactory.create(AppModule);
// 	app.use(cookieParser());
// 	// app.enableCors({
// 	// 	origin: "http://localhost:3000",
// 	// 	credentials: true,
// 	// });
// 	// app.use(express.json());
// 	app.use(cors());
// 	// app.useGlobalPipes(new ValidationPipe());
// 	app.use(session(sessionConfig));
// 	// await app.listen(3001);
// 	await app.listen(process.env.PORT || 8000);
// }
// bootstrap();
