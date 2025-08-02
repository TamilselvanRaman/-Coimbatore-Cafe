export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isSpecial?: boolean;
  available?: boolean;
}

export const menuData: Record<string, MenuItem[]> = {
  "Classic Coffees": [
    {
      id: "cc1",
      name: "Espresso",
      description: "Rich, bold shot of coffee with perfect crema",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "classic",
    },
    {
      id: "cc2",
      name: "Americano",
      description: "Smooth espresso with hot water for a clean taste",
      price: 110,
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "classic",
    },
    {
      id: "cc3",
      name: "Cappuccino",
      description: "Perfect balance of espresso, steamed milk, and foam",
      price: 130,
      imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "classic",
    },
    {
      id: "cc4",
      name: "Latte",
      description: "Creamy steamed milk with a gentle espresso flavor",
      price: 140,
      imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "classic",
    },
    {
      id: "cc5",
      name: "Mocha",
      description: "Rich chocolate and espresso blend with steamed milk",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "classic",
    },
    {
      id: "cc6",
      name: "Cold Brew",
      description: "Smooth, refreshing coffee brewed over 12 hours",
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "classic",
    },
  ],
  "Local Specials": [
    {
      id: "slc1",
      name: "Kumbakonam Degree Coffee",
      description: "Authentic degree coffee from Kumbakonam region",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "local",
      isSpecial: true,
    },
    {
      id: "slc2",
      name: "Filter Kaapi",
      description: "Traditional South Indian filter coffee with chicory",
      price: 70,
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "local",
      isSpecial: true,
    },
    {
      id: "slc3",
      name: "Karupatti Coffee",
      description: "Premium coffee sweetened with pure palm jaggery",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "local",
      isSpecial: true,
    },
    {
      id: "slc4",
      name: "Sukku Malli Coffee",
      description: "Aromatic coffee with dry ginger and coriander",
      price: 75,
      imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "local",
    },
  ],
  "Premium Teas": [
    {
      id: "t1",
      name: "Masala Chai",
      description: "Traditional spiced tea with aromatic Indian spices",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "teas",
    },
    {
      id: "t2",
      name: "Ginger Tea",
      description: "Refreshing tea infused with fresh ginger",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1597318280699-badb23a5a2bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "teas",
    },
    {
      id: "t3",
      name: "Cardamom Tea",
      description: "Aromatic tea with premium green cardamom",
      price: 65,
      imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "teas",
    },
    {
      id: "t4",
      name: "Sulaimani Tea",
      description: "Light black tea with lemon and spices",
      price: 50,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "teas",
    },
    {
      id: "t5",
      name: "Iced Lemon Tea",
      description: "Refreshing cold tea with fresh lemon and mint",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "teas",
    },
  ],
  "Special Drinks": [
    {
      id: "sd1",
      name: "Caramel Cloud Cold Brew",
      description: "Cold brew with caramel swirl and cloud foam",
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "special",
      isSpecial: true,
    },
    {
      id: "sd2",
      name: "Vanilla Sweet Cream Cold Brew",
      description: "Cold brew topped with vanilla sweet cream",
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "special",
      isSpecial: true,
    },
    {
      id: "sd3",
      name: "Nannari Sharbat",
      description: "Traditional sarsaparilla root drink",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "special",
    },
    {
      id: "sd4",
      name: "Rose Milk",
      description: "Fragrant rose-flavored milk drink",
      price: 75,
      imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "special",
    },
    {
      id: "sd5",
      name: "Badam Milk",
      description: "Rich almond milk served hot or cold",
      price: 85,
      imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "special",
    },
    {
      id: "sd6",
      name: "Jigarthanda",
      description: "Madurai's famous cold drink with ice cream",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      category: "special",
      isSpecial: true,
    },
  ],
};

export const snacksData: MenuItem[] = [
  {
    id: "sn1",
    name: "Samosa",
    description: "Crispy fried pastry with spiced potato filling",
    price: 40,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "snacks",
  },
  {
    id: "sn2",
    name: "Veg Sandwich",
    description: "Fresh vegetables with mint chutney",
    price: 70,
    imageUrl: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "snacks",
  },
  {
    id: "sn3",
    name: "Croissants",
    description: "Buttery, flaky French pastry",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f1bccf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "snacks",
  },
  {
    id: "sn4",
    name: "Brownies",
    description: "Rich chocolate brownies with nuts",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "snacks",
  },
  {
    id: "sn5",
    name: "Cheesecake",
    description: "Creamy New York style cheesecake",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    category: "snacks",
  },
];

export const getAllMenuItems = (): MenuItem[] => {
  return [...Object.values(menuData).flat(), ...snacksData];
};

export const getMenuByCategory = (category: string): MenuItem[] => {
  if (category === "snacks") return snacksData;
  return menuData[category] || [];
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return getAllMenuItems().find(item => item.id === id);
};
