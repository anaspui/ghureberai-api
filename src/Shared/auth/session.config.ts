import session, { SessionData } from "express-session";
import { User } from "../entities/user.entity";

export interface CurrentSession extends SessionData {
	isAuthenticated: boolean;
	users?: User[];
}

export const sessionConfig: session.SessionOptions = {
	secret: "auth",
	resave: false,
	saveUninitialized: false,
};
