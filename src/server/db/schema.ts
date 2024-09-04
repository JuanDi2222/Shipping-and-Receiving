import { sql } from "drizzle-orm";
import {
  primaryKey,
  int,
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
  boolean,
  longtext,
  mysqlEnum,
  json
} from "drizzle-orm/mysql-core";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import type { AdapterAccountType } from "next-auth/adapters";

export const createTable = mysqlTableCreator((name) => `${name}`);

export const user = createTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),
  image: longtext("image"),
  phone: int("phone"),
  department: int("department"),
});

export const shipmentNotice = createTable("shipmentNotice", {
  id: int("id").primaryKey().autoincrement(),
  date: timestamp("date").notNull().defaultNow(),
  epdc: boolean("epdc").default(false),
  etdc: boolean("etdc").default(false),
  drchih: boolean("drchih").default(false),
  dhl: boolean("dhl").default(false),
  fedex: boolean("fedex").default(false),
  panalpina: boolean("panalpina").default(false),
  ups: boolean("ups").default(false),
  ctransport: boolean("ctransport").default(false),
  fedexground: boolean("fedexGround").default(false),
  other: varchar("other", { length: 255 }).default(""),
  line: varchar("Line", { length: 255 }).notNull(),
  plates: varchar("plates", { length: 255 }).notNull(),
  seal: int("seal").notNull(),
  manifest: varchar("manifest", { length: 255 }).default(""),
  bulks: int("bulks").notNull(),
  description: varchar("description", { length: 255 }).default(""),
  operator: varchar("operator", { length: 255 }).notNull().default(""),
  creator: varchar("creator", { length: 255 }).notNull().default(""),
  pediment: int("pediment").default(0),
  pedimentCode: varchar("pedimentCode", { length: 255 }).default(""),
  entry: int("entry").default(0),
  bulksfedex: int("bulksfedex").default(0),
  bulksfdxfreight: int("bulksFedexFreight").default(0),
  bulksfdxground: int("bulksFedexGround").default(0),
  bulksdhl: int("bulksDHL").default(0),
  bulksups: int("bulksUPS").default(0),
  etdcdock: varchar("etdcdock", { length: 255 }).default(""),
  epdcdock: varchar("epdcdock", { length: 255 }).default(""),
  otherdock: varchar("otherdock", { length: 255 }).default(""),
  bulksetdc: varchar("bulksETDC", { length: 255 }).default(""),
  bulksepdc: varchar("bulksEPDC", { length: 255 }).default(""),
  bulksOther: varchar("bulksOther", { length: 255 }).default(""),
});

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccountType>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const shipment = createTable("shipment", {
  id: int("id").primaryKey().autoincrement(),
  date: timestamp("date").notNull().defaultNow(),
  carrier: mysqlEnum("carrier", ["DHL", "UPS", "FedEx", "FedEx Freight", "Estafeta"]).notNull(),
  tracking: varchar("tracking", { length: 255 }).notNull(),
  service: mysqlEnum("service", [
    "Standard Overnight",
    "Second Business Day",
    "Ground",
    "Priority Overnight",
    "Next Day Delivery",
    "International",
  ]).notNull(),
  account: varchar("account", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  area: varchar("area", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  recipient: varchar("recipient", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  project: varchar("project", { length: 255 }).notNull(),
  goods: json("goods"),
  quantity: int("quantity").notNull(),
  pieces: int("pieces").notNull(),
  cost: int("cost").notNull(),
  debit: int("debit").notNull(),
  requestor: varchar("requestor", { length: 255 }).notNull(),
  noticeId: int("noticeId"),
  userId: varchar("userId", { length: 255 }).notNull(),
  shippingDate: timestamp("shippingDate"),
  recievedDate: timestamp("recievedDate"),
  expectedDate: timestamp("expectedDate"),
  recievedBy: varchar("recievedBy", { length: 255 }).notNull(),
  bol: varchar("BOL", { length: 255 }).notNull(),
  status: mysqlEnum("status", [
    "sent",
    "pending",
    "processing",
    "delivered",
    "failed",
  ]).notNull(),
});

export const sessions = createTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
