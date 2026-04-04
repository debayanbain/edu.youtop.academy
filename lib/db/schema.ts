import {
  pgTable,
  text,
  bigint,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  // auto-increment PK matching existing integer id column in Neon
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  // Clerk user ID stored separately so we can look users up by Clerk ID
  clerkId: text("clerk_id").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  emailId: text("email_id").unique().notNull(),
  mobileNumber: bigint("mobile_number", { mode: "number" }),
  imageUrl: text("image_url"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const orders = pgTable("orders", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: text("user_id").notNull(),
  orderId: text("order_id").notNull(),
  paymentId: text("payment_id"),
  amount: integer("amount").notNull(),
  currency: text("currency").default("INR").notNull(),
  status: text("status").default("pending").notNull(),
  productType: text("product_type").notNull(), // 'ebook' or 'note'
  productId: text("product_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
