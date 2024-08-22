import { drizzle } from "drizzle-orm/mysql2";
import { createPool, type Pool } from "mysql2/promise";
import mysql from "mysql2/promise"

import { env } from "~/env";
import * as schema from "./schema";

const poolConnection = mysql.createPool({ host:"localhost", user: "root", database: "mtc", password: "juan" });

export const db = drizzle(poolConnection, { schema, mode: "default" });