import session from "express-session";
//session config for global
export const sessionConfig: session.SessionOptions = {
	secret: "auth",
	resave: false,
	saveUninitialized: false,
};
