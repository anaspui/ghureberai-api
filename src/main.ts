import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { sessionConfig } from "./Shared/auth/session.config";
import * as cookieParser from "cookie-parser";
import * as process from "process";

const express = require("express");
const app = express();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: [
			"https://ghureberai-git-vercel-anaspui.vercel.app",
			"https://ghureberai-a8umtdtbz-anaspui.vercel.app",
			"https://ghureberai-7ahk2viuj-anaspui.vercel.app",
			"http://localhost:3000",
		],
		credentials: true,
	});
	app.use(cookieParser());
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
