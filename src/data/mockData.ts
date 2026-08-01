export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'Classic' | 'Specialty' | 'Veggie' | 'Spicy' | 'Chef\'s Special';
  image: string;
  calories: number;
  prepTime: string;
  isBestseller?: boolean;
  isNew?: boolean;
  ingredients: string[];
  dietary: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Halal')[];
}

export interface Topping {
  id: string;
  name: string;
  category: 'crust' | 'sauce' | 'cheese' | 'veggies' | 'meats';
  price: number;
  image?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  size: 'Small (10")' | 'Medium (12")' | 'Large (14")' | 'Extra Large (16")';
  crust: string;
  price: number;
  quantity: number;
  image: string;
  customToppings?: string[];
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Order Received' | 'Preparing' | 'In Kitchen' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  estimatedDelivery: string;
  deliveryAddress: string;
  driverName?: string;
  driverPhone?: string;
}

export const MOCK_PIZZAS: Pizza[] = [
  {
    id: 'pizza-1',
    name: 'Truffle Pepperoni Supreme',
    description: 'Double layer wood-fired artisan pepperoni, creamy mozzarella, black truffle infusion, and organic basil leaves.',
    price: 22.99,
    rating: 4.9,
    reviewsCount: 342,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=85',
    calories: 1150,
    prepTime: '15-20 min',
    isBestseller: true,
    ingredients: ['San Marzano Tomato Sauce', 'Fresh Mozzarella', 'Artisan Pepperoni', 'Black Truffle Oil', 'Fresh Basil'],
    dietary: ['Halal']
  },
  {
    id: 'pizza-2',
    name: 'Margherita Burrata Gold',
    description: 'Fresh heritage tomatoes, whole fresh burrata heart, extra virgin olive oil, Parmigiano-Reggiano, micro basil.',
    price: 19.50,
    rating: 4.8,
    reviewsCount: 215,
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=1200&q=85',
    calories: 920,
    prepTime: '12-15 min',
    isBestseller: true,
    ingredients: ['Italian Tomato Sauce', 'Whole Burrata', 'Extra Virgin Olive Oil', 'Aged Parmigiano', 'Sweet Basil'],
    dietary: ['Vegetarian']
  },
  {
    id: 'pizza-3',
    name: 'Fiery Calabrian Spicy BBQ',
    description: 'Smoky BBQ reduction, pulled spicy chicken, Calabrian chili crisp, red onions, smoked provolone.',
    price: 24.00,
    rating: 4.7,
    reviewsCount: 189,
    category: 'Spicy',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
    calories: 1280,
    prepTime: '18-22 min',
    isNew: true,
    ingredients: ['Smoky BBQ Reduction', 'Spicy Chicken', 'Calabrian Chili', 'Red Onion', 'Smoked Provolone'],
    dietary: ['Halal']
  },
  {
    id: 'pizza-4',
    name: 'Garden Harvest Truffle Vegan',
    description: 'Roasted bell peppers, caramelized onions, wild forest mushrooms, baby spinach, avocado garlic crema.',
    price: 21.00,
    rating: 4.9,
    reviewsCount: 145,
    category: 'Veggie',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85',
    calories: 840,
    prepTime: '15-18 min',
    isBestseller: false,
    ingredients: ['Herbed Garlic Oil Base', 'Wild Mushrooms', 'Caramelized Onion', 'Roasted Peppers', 'Vegan Mozzarella'],
    dietary: ['Vegan', 'Gluten-Free', 'Vegetarian']
  },
  {
    id: 'pizza-5',
    name: 'Quattro Formaggi Reserve',
    description: 'Gorgonzola Dolce, Smoked Mozzarella, Fontina, Parmigiano Reggiano, drizzled with wildflower honey.',
    price: 23.50,
    rating: 4.8,
    reviewsCount: 98,
    category: 'Chef\'s Special',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
    calories: 1310,
    prepTime: '15-20 min',
    isBestseller: false,
    ingredients: ['Gorgonzola', 'Smoked Mozzarella', 'Fontina', 'Parmigiano', 'Wildflower Honey'],
    dietary: ['Vegetarian']
  },
  {
    id: 'pizza-6',
    name: 'Smoked Bacon & Hot Honey',
    description: 'Crispy thick-cut smoked bacon, spicy pepperoni, fresh jalapeno rings, whipped ricotta, spicy hot honey drizzle.',
    price: 25.00,
    rating: 4.95,
    reviewsCount: 410,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=85',
    calories: 1420,
    prepTime: '18-22 min',
    isBestseller: true,
    ingredients: ['San Marzano Tomatoes', 'Thick Bacon', 'Pepperoni', 'Whipped Ricotta', 'Hot Honey Drizzle'],
    dietary: []
  },
  {
    id: 'pizza-7',
    name: 'Prosciutto e Funghi Gourmet',
    description: 'Aged Parma prosciutto di San Daniele, wild porcini mushrooms, fresh fior di latte, and micro thyme.',
    price: 26.50,
    rating: 4.92,
    reviewsCount: 167,
    category: 'Chef\'s Special',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=85',
    calories: 1080,
    prepTime: '15-20 min',
    isNew: true,
    ingredients: ['San Daniele Prosciutto', 'Porcini Mushrooms', 'Fior di Latte', 'Micro Thyme'],
    dietary: []
  },
  {
    id: 'pizza-8',
    name: 'Pesto Genovese & Sundried Tomato',
    description: 'Housemade pine nut pesto, sundried Roma tomatoes, roasted pine nuts, whipped goat cheese, balsamic drizzle.',
    price: 22.00,
    rating: 4.86,
    reviewsCount: 134,
    category: 'Veggie',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=1200&q=85',
    calories: 950,
    prepTime: '12-16 min',
    isBestseller: false,
    ingredients: ['Pine Nut Pesto', 'Sundried Tomatoes', 'Goat Cheese', 'Balsamic Glaze'],
    dietary: ['Vegetarian']
  }
];

export const MOCK_BUILDER_OPTIONS = {
  crusts: [
    { id: 'classic', name: 'Classic Hand-Tossed', price: 0, desc: 'Golden crust, crisp outside and chewy inside' },
    { id: 'pan', name: 'Thick Pan Crust', price: 2.50, desc: 'Deep dish style baked in cast iron' },
    { id: 'thin', name: 'Ultra-Thin Crispy', price: 1.00, desc: 'Light, crackly Roman style thin crust' },
    { id: 'stuffed', name: 'Mozzarella Stuffed Crust', price: 3.50, desc: 'Filled with melted 100% mozzarella cheese' }
  ],
  sauces: [
    { id: 'tomato', name: 'San Marzano Tomato', price: 0, desc: 'Rich vine-ripened Italian tomatoes & basil' },
    { id: 'spicy-marinara', name: 'Spicy Calabrian Marinara', price: 0.75, desc: 'Kick of red chili and roasted garlic' },
    { id: 'creamy-garlic', name: 'Creamy Garlic Alfredo', price: 1.50, desc: 'Rich Parmigiano cream sauce' },
    { id: 'smoky-bbq', name: 'Smoky Honey BBQ', price: 1.25, desc: 'Sweet, tangy wood-smoked barbecue' }
  ],
  cheeses: [
    { id: 'mozzarella', name: 'Fresh Mozzarella Blend', price: 0, desc: 'Classic whole milk mozzarella' },
    { id: 'burrata', name: 'Artisan Burrata Ball', price: 3.00, desc: 'Creamy center burrata cheese' },
    { id: 'provolone', name: 'Smoked Provolone', price: 1.50, desc: 'Rich buttery smoked flavor' },
    { id: 'vegan-cheese', name: 'Dairy-Free Vegan Melt', price: 2.00, desc: 'Plant-based mozzarella alternative' }
  ],
  veggies: [
    { id: 'mushrooms', name: 'Wild Forest Mushrooms', price: 1.25 },
    { id: 'peppers', name: 'Roasted Bell Peppers', price: 1.00 },
    { id: 'onions', name: 'Caramelized Red Onions', price: 1.00 },
    { id: 'olives', name: 'Kalamata Black Olives', price: 1.25 },
    { id: 'basil', name: 'Organic Fresh Basil', price: 0.75 },
    { id: 'jalapenos', name: 'Fresh Jalapeno Rings', price: 1.00 }
  ],
  meats: [
    { id: 'pepperoni', name: 'Artisan Pepperoni', price: 2.25 },
    { id: 'chicken', name: 'Grilled Herb Chicken', price: 2.50 },
    { id: 'bacon', name: 'Thick-Cut Smoked Bacon', price: 2.75 },
    { id: 'sausage', name: 'Italian Fennel Sausage', price: 2.25 }
  ]
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-94821',
    customerName: 'Alex Morgan',
    customerEmail: 'alex@example.com',
    items: [
      { id: 'pizza-1', name: 'Truffle Pepperoni Supreme', size: 'Large (14")', crust: 'Classic Hand-Tossed', price: 22.99, quantity: 2, image: MOCK_PIZZAS[0].image },
      { id: 'pizza-2', name: 'Margherita Burrata Gold', size: 'Medium (12")', crust: 'Ultra-Thin Crispy', price: 19.50, quantity: 1, image: MOCK_PIZZAS[1].image }
    ],
    totalAmount: 65.48,
    status: 'In Kitchen',
    createdAt: 'Today, 11:30 AM',
    estimatedDelivery: '11:55 AM (25 mins)',
    deliveryAddress: '742 Evergreen Terrace, Apt 4B, Seattle, WA',
    driverName: 'Marco Rossi',
    driverPhone: '+1 (555) 234-5678'
  },
  {
    id: 'ORD-94819',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    items: [
      { id: 'pizza-6', name: 'Smoked Bacon & Hot Honey', size: 'Extra Large (16")', crust: 'Mozzarella Stuffed Crust', price: 25.00, quantity: 1, image: MOCK_PIZZAS[5].image }
    ],
    totalAmount: 28.50,
    status: 'Out for Delivery',
    createdAt: 'Today, 11:15 AM',
    estimatedDelivery: '11:42 AM (10 mins)',
    deliveryAddress: '1000 2nd Ave, Suite 300, Seattle, WA',
    driverName: 'David Chen',
    driverPhone: '+1 (555) 876-5432'
  },
  {
    id: 'ORD-94810',
    customerName: 'Michael Scott',
    customerEmail: 'm.scott@dunder.com',
    items: [
      { id: 'pizza-4', name: 'Garden Harvest Truffle Vegan', size: 'Medium (12")', crust: 'Classic Hand-Tossed', price: 21.00, quantity: 3, image: MOCK_PIZZAS[3].image }
    ],
    totalAmount: 68.20,
    status: 'Delivered',
    createdAt: 'Yesterday, 7:45 PM',
    estimatedDelivery: '8:15 PM',
    deliveryAddress: '1725 Slough Avenue, Scranton, PA'
  }
];

export const MOCK_ADMIN_METRICS = {
  totalRevenue: 24850.70,
  revenueChange: '+12.5%',
  totalOrders: 1240,
  ordersChange: '+8.1%',
  avgOrderValue: 34.50,
  avgDeliveryTime: '24 min',
  weeklySales: [
    { day: 'Mon', sales: 3100 },
    { day: 'Tue', sales: 2700 },
    { day: 'Wed', sales: 3600 },
    { day: 'Thu', sales: 3900 },
    { day: 'Fri', sales: 5200 },
    { day: 'Sat', sales: 6100 },
    { day: 'Sun', sales: 4500 }
  ],
  topPizzas: [
    { name: 'Pepperoni Supreme', percentage: 35, color: '#FF6B35' },
    { name: 'Margherita Burrata', percentage: 25, color: '#FFB703' },
    { name: 'Smoked Bacon', percentage: 20, color: '#2EC4B6' },
    { name: 'Garden Vegan', percentage: 15, color: '#10B981' },
    { name: 'Quattro Formaggi', percentage: 5, color: '#8B5CF6' }
  ]
};
