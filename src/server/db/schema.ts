import {relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  bigint,
  boolean,
  json,
  date,
  pgEnum,
  pgTable,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";


export const user = pgTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }),
  image: text("image"),
  phone: integer("phone"),
  department: integer("department"),
});

export const shipmentNotice = pgTable("shipmentNotice", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
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
  seal: integer("seal").notNull(),
  manifest: varchar("manifest", { length: 255 }).default(""),
  bulks: integer("bulks").notNull(),
  description: varchar("description", { length: 255 }).default(""),
  operator: varchar("operator", { length: 255 }).notNull().default(""),
  creator: varchar("creator", { length: 255 }).notNull().default(""),
  pediment: integer("pediment").default(0),
  pedimentCode: varchar("pedimentCode", { length: 255 }).default(""),
  entry: integer("entry").default(0),
  bulksfedex: integer("bulksfedex").default(0),
  bulksfdxfreight: integer("bulksFedexFreight").default(0),
  bulksfdxground: integer("bulksFedexGround").default(0),
  bulksdhl: integer("bulksDHL").default(0),
  bulksups: integer("bulksUPS").default(0),
  etdcdock: varchar("etdcdock", { length: 255 }).default(""),
  epdcdock: varchar("epdcdock", { length: 255 }).default(""),
  otherdock: varchar("otherdock", { length: 255 }).default(""),
  bulksetdc: varchar("bulksETDC", { length: 255 }).default(""),
  bulksepdc: varchar("bulksEPDC", { length: 255 }).default(""),
  bulksOther: varchar("bulksOther", { length: 255 }).default(""),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)


export const carrierEnum = pgEnum("carrier", ["DHL", "UPS", "FedEx", "FedEx Freight", "Estafeta"]);
export const serviceEnum = pgEnum("service", [
  "Standard Overnight",
  "Second Business Day",
  "Ground",
  "Priority Overnight",
  "Next Day Delivery",
  "International",
]);
export const statusEnum = pgEnum("status", [
  "sent",
  "pending",
  "processing",
  "delivered",
  "failed",
  "transit",
]);

export const shipment = pgTable("shipment", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  date: timestamp("date").notNull().defaultNow(),
  carrier: carrierEnum().notNull().default("DHL"),
  tracking: varchar("tracking", { length: 255 }).notNull().default(""),
  service: serviceEnum().notNull().default("Standard Overnight"),
  account: varchar("account", { length: 255 }).notNull().default(""),
  company: varchar("company", { length: 255 }).notNull().default(""),
  address: varchar("address", { length: 255 }).notNull().default(""),
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
  quantity: integer("quantity").notNull(),
  pieces: integer("pieces").notNull(),
  cost: integer("cost").notNull(),
  shippingCost: integer("shippingCost").notNull(),
  debit: integer("debit").notNull(),
  requestor: varchar("requestor", { length: 255 }).notNull(),
  noticeId: integer("noticeId"),
  userId: varchar("userId", { length: 255 }).notNull(),
  shippingDate: date("shippingDate"),
  recievedDate: date("recievedDate"),
  expectedDate: date("expectedDate"),
  recievedBy: varchar("recievedBy", { length: 255 }).notNull(),
  bol: varchar("bol", { length: 255 }).notNull(),
  status: statusEnum().notNull(),
});

 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)