import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  profileImageUrl: text("profile_image_url"),
  loginProvider: varchar("login_provider").default("email"), // email, google, apple
  providerUserId: varchar("provider_user_id"),
  membershipTier: varchar("membership_tier").default("regular"), // regular, golden7star
  totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).default("0"),
  pointsBalance: integer("points_balance").default(0),
  lastVisitDuration: integer("last_visit_duration").default(0), // in seconds
  ipAddress: varchar("ip_address"),
  isEmailVerified: boolean("is_email_verified").default(false),
  isMobileVerified: boolean("is_mobile_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  displayOrder: integer("display_order").default(0),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  categoryId: varchar("category_id").references(() => categories.id),
  available: boolean("available").default(true),
  isSpecial: boolean("is_special").default(false),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, preparing, on_the_way, delivered, cancelled
  deliveryAddress: text("delivery_address"),
  deliveryBoyName: varchar("delivery_boy_name"),
  deliveryBoyPhone: varchar("delivery_boy_phone"),
  deliveryPersonContact: text("delivery_person_contact"),
  paymentId: text("payment_id"),
  paymentStatus: text("payment_status").default("pending"), // pending, completed, failed, refunded
  orderNumber: text("order_number").notNull().unique(),
  estimatedDeliveryTime: timestamp("estimated_delivery_time"),
  actualDeliveryTime: timestamp("actual_delivery_time"),
  currentLocation: jsonb("current_location"), // { lat, lng, timestamp, address }
  orderType: varchar("order_type").default("delivery"), // delivery, pickup
  paymentMethod: varchar("payment_method"),
  razorpayOrderId: varchar("razorpay_order_id"),
  razorpayPaymentId: varchar("razorpay_payment_id"),
  specialInstructions: varchar("special_instructions", { length: 1000 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id),
  productId: varchar("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  customizations: jsonb("customizations"), // { size: 'large', strength: 'medium', milk: 'oat', extras: [] }
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  productId: varchar("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  customizations: jsonb("customizations"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wishlist = pgTable("wishlist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  productId: varchar("product_id").references(() => products.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Order tracking events for live delivery tracking
export const orderTrackingEvents = pgTable("order_tracking_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id, { onDelete: "cascade" }),
  status: varchar("status"),
  message: varchar("message", { length: 500 }),
  location: jsonb("location"), // { lat, lng, address }
  timestamp: timestamp("timestamp").defaultNow(),
});

// Membership benefits and offers
export const offers = pgTable("offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title"),
  description: varchar("description", { length: 1000 }),
  discountType: varchar("discount_type"), // percentage, fixed, bogo
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }),
  minimumOrderAmount: decimal("minimum_order_amount", { precision: 10, scale: 2 }),
  membershipTierRequired: varchar("membership_tier_required"),
  validFrom: timestamp("valid_from"),
  validUntil: timestamp("valid_until"),
  isActive: boolean("is_active").default(true),
  maxUsagePerUser: integer("max_usage_per_user").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

// User offer usage tracking
export const userOfferUsage = pgTable("user_offer_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  offerId: varchar("offer_id").references(() => offers.id, { onDelete: "cascade" }),
  usedCount: integer("used_count").default(0),
  lastUsedAt: timestamp("last_used_at"),
});

// Session tracking for user engagement and login prompts
export const userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").unique(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  ipAddress: varchar("ip_address"),
  userAgent: varchar("user_agent", { length: 1000 }),
  sessionDuration: integer("session_duration"), // in seconds
  pagesVisited: jsonb("pages_visited"),
  deviceInfo: jsonb("device_info"),
  location: jsonb("location"), // { lat, lng, city, country }
  loginPromptSent: boolean("login_prompt_sent").default(false),
  smsReminderSent: boolean("sms_reminder_sent").default(false),
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  orderNumber: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export const insertWishlistSchema = createInsertSchema(wishlist).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type Wishlist = typeof wishlist.$inferSelect;
export type InsertWishlist = z.infer<typeof insertWishlistSchema>;

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
