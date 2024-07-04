import express, { Application } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app: Application = express();
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use("/api", router);

app.use(notFound);

export default app;