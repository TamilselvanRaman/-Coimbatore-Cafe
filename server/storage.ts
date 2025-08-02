import { 
  type User, 
  type InsertUser,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type CartItem,
  type InsertCartItem,
  type Wishlist,
  type InsertWishlist
} from "@shared/schema";
import { randomUUID } from "crypto";

// Enhanced interface with all CRUD methods needed for the application
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, updates: Partial<InsertCategory>): Promise<Category | undefined>;

  // Product operations
  getProducts(categoryId?: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Cart operations
  getCartItems(userId: string): Promise<CartItem[]>;
  getCartItem(id: string): Promise<CartItem | undefined>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<boolean>;

  // Order operations
  getUserOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  addOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;

  // Wishlist operations
  getWishlistItems(userId: string): Promise<Wishlist[]>;
  addToWishlist(wishlistItem: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;
  private wishlistItems: Map<string, Wishlist>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.wishlistItems = new Map();
    
    // Initialize with sample categories and products
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create categories
    const categories = [
      { name: "Classic Coffees", description: "Traditional coffee varieties", displayOrder: 1 },
      { name: "Local Specials", description: "South Indian coffee specialties", displayOrder: 2 },
      { name: "Premium Teas", description: "Finest tea selections", displayOrder: 3 },
      { name: "Special Drinks", description: "Unique beverage creations", displayOrder: 4 },
      { name: "Snacks & Desserts", description: "Delicious accompaniments", displayOrder: 5 },
    ];

    categories.forEach(cat => {
      const category: Category = {
        id: randomUUID(),
        ...cat,
      };
      this.categories.set(category.id, category);
    });

    // Get category IDs
    const [classicId, localId, teaId, specialId, snackId] = Array.from(this.categories.values()).map(c => c.id);

    // Create products
    const products = [
      // Classic Coffees
      { name: "Espresso", description: "Rich, bold shot of coffee with perfect crema", price: "90", imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: classicId, available: true, isSpecial: false },
      { name: "Americano", description: "Smooth espresso with hot water for a clean taste", price: "110", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: classicId, available: true, isSpecial: false },
      { name: "Cappuccino", description: "Perfect balance of espresso, steamed milk, and foam", price: "130", imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: classicId, available: true, isSpecial: false },
      { name: "Latte", description: "Creamy steamed milk with a gentle espresso flavor", price: "140", imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: classicId, available: true, isSpecial: false },
      { name: "Mocha", description: "Rich chocolate and espresso blend with steamed milk", price: "150", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: classicId, available: true, isSpecial: false },
      { name: "Cold Brew", description: "Smooth, refreshing coffee brewed over 12 hours", price: "160", imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: classicId, available: true, isSpecial: false },

      // Local Specials
      { name: "Kumbakonam Degree Coffee", description: "Authentic degree coffee from Kumbakonam region", price: "80", imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: localId, available: true, isSpecial: true },
      { name: "Filter Kaapi", description: "Traditional South Indian filter coffee with chicory", price: "70", imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: localId, available: true, isSpecial: true },
      { name: "Karupatti Coffee", description: "Premium coffee sweetened with pure palm jaggery", price: "90", imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: localId, available: true, isSpecial: true },
      { name: "Sukku Malli Coffee", description: "Aromatic coffee with dry ginger and coriander", price: "75", imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: localId, available: true, isSpecial: false },

      // Premium Teas
      { name: "Masala Chai", description: "Traditional spiced tea with aromatic Indian spices", price: "60", imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: teaId, available: true, isSpecial: false },
      { name: "Ginger Tea", description: "Refreshing tea infused with fresh ginger", price: "60", imageUrl: "https://images.unsplash.com/photo-1597318280699-badb23a5a2bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: teaId, available: true, isSpecial: false },
      { name: "Cardamom Tea", description: "Aromatic tea with premium green cardamom", price: "65", imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: teaId, available: true, isSpecial: false },
      { name: "Sulaimani Tea", description: "Light black tea with lemon and spices", price: "50", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: teaId, available: true, isSpecial: false },
      { name: "Iced Lemon Tea", description: "Refreshing cold tea with fresh lemon and mint", price: "80", imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: teaId, available: true, isSpecial: false },

      // Special Drinks
      { name: "Caramel Cloud Cold Brew", description: "Cold brew with caramel swirl and cloud foam", price: "180", imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: specialId, available: true, isSpecial: true },
      { name: "Vanilla Sweet Cream Cold Brew", description: "Cold brew topped with vanilla sweet cream", price: "180", imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: specialId, available: true, isSpecial: true },
      { name: "Nannari Sharbat", description: "Traditional sarsaparilla root drink", price: "80", imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: specialId, available: true, isSpecial: false },
      { name: "Rose Milk", description: "Fragrant rose-flavored milk drink", price: "75", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: specialId, available: true, isSpecial: false },
      { name: "Badam Milk", description: "Rich almond milk served hot or cold", price: "85", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: specialId, available: true, isSpecial: false },
      { name: "Jigarthanda", description: "Madurai's famous cold drink with ice cream", price: "90", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: specialId, available: true, isSpecial: true },

      // Snacks & Desserts
      { name: "Samosa", description: "Crispy fried pastry with spiced potato filling", price: "40", imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: snackId, available: true, isSpecial: false },
      { name: "Veg Sandwich", description: "Fresh vegetables with mint chutney", price: "70", imageUrl: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: snackId, available: true, isSpecial: false },
      { name: "Croissants", description: "Buttery, flaky French pastry", price: "90", imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f1bccf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: snackId, available: true, isSpecial: false },
      { name: "Brownies", description: "Rich chocolate brownies with nuts", price: "90", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: snackId, available: true, isSpecial: false },
      { name: "Cheesecake", description: "Creamy New York style cheesecake", price: "120", imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400", categoryId: snackId, available: true, isSpecial: false },
    ];

    products.forEach(prod => {
      const product: Product = {
        id: randomUUID(),
        ...prod,
      };
      this.products.set(product.id, product);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      address: insertUser.address || null,
      phone: insertUser.phone || null,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id,
      description: insertCategory.description || null,
      displayOrder: insertCategory.displayOrder || null,
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: string, updates: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    
    const updatedCategory: Category = { ...category, ...updates };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  // Product operations
  async getProducts(categoryId?: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    if (categoryId) {
      return products.filter(product => product.categoryId === categoryId && product.available);
    }
    return products.filter(product => product.available);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      description: insertProduct.description || null,
      imageUrl: insertProduct.imageUrl || null,
      categoryId: insertProduct.categoryId || null,
      available: insertProduct.available || null,
      isSpecial: insertProduct.isSpecial || null,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct: Product = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Cart operations
  async getCartItems(userId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
  }

  async getCartItem(id: string): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id,
      userId: insertCartItem.userId || null,
      productId: insertCartItem.productId || null,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem: CartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: string): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.entries()).filter(([, item]) => item.userId === userId);
    userCartItems.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }

  // Order operations
  async getUserOrders(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const orderNumber = `ORD${Date.now()}`;
    const now = new Date();
    
    const order: Order = { 
      ...insertOrder, 
      id,
      orderNumber,
      status: insertOrder.status || "pending",
      userId: insertOrder.userId || null,
      deliveryAddress: insertOrder.deliveryAddress || null,
      deliveryPersonContact: insertOrder.deliveryPersonContact || null,
      paymentId: insertOrder.paymentId || null,
      paymentStatus: insertOrder.paymentStatus || null,
      estimatedDeliveryTime: insertOrder.estimatedDeliveryTime || null,
      createdAt: now,
      updatedAt: now,
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder: Order = { 
      ...order, 
      status,
      updatedAt: new Date(),
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async addOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const orderItem: OrderItem = { 
      ...insertOrderItem, 
      id,
      productId: insertOrderItem.productId || null,
      orderId: insertOrderItem.orderId || null,
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  // Wishlist operations
  async getWishlistItems(userId: string): Promise<Wishlist[]> {
    return Array.from(this.wishlistItems.values()).filter(item => item.userId === userId);
  }

  async addToWishlist(insertWishlistItem: InsertWishlist): Promise<Wishlist> {
    const id = randomUUID();
    const wishlistItem: Wishlist = { 
      ...insertWishlistItem, 
      id,
      userId: insertWishlistItem.userId || null,
      productId: insertWishlistItem.productId || null,
      createdAt: new Date(),
    };
    this.wishlistItems.set(id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(id: string): Promise<boolean> {
    return this.wishlistItems.delete(id);
  }
}

export const storage = new MemStorage();
