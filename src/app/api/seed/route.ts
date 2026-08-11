import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Pizza } from '@/models/Pizza';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

const INITIAL_PIZZAS = [
  {
    name: 'Truffle Pepperoni Supreme',
    description: 'Double layer wood-fired artisan pepperoni, creamy mozzarella, black truffle infusion, and organic basil leaves.',
    price: 22.99,
    rating: 4.9,
    category: 'popular',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=85',
    badge: 'BESTSELLER',
    ingredients: ['San Marzano Tomato Sauce', 'Fresh Mozzarella', 'Artisan Pepperoni', 'Black Truffle Oil', 'Fresh Basil'],
    crustOptions: ['Classic Hand-Tossed', 'Thick Pan Crust', 'Ultra-Thin Crispy', 'Mozzarella Stuffed Crust'],
    sizeOptions: [
      { name: 'Small (10")', priceMultiplier: 0.8 },
      { name: 'Medium (12")', priceMultiplier: 1.0 },
      { name: 'Large (14")', priceMultiplier: 1.3 },
      { name: 'Extra Large (16")', priceMultiplier: 1.6 }
    ],
    isAvailable: true
  },
  {
    name: 'Margherita Burrata Gold',
    description: 'Fresh heritage tomatoes, whole fresh burrata heart, extra virgin olive oil, Parmigiano-Reggiano, micro basil.',
    price: 19.50,
    rating: 4.8,
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=1200&q=85',
    badge: 'POPULAR',
    ingredients: ['Italian Tomato Sauce', 'Whole Burrata', 'Extra Virgin Olive Oil', 'Aged Parmigiano', 'Sweet Basil'],
    crustOptions: ['Classic Hand-Tossed', 'Ultra-Thin Crispy'],
    sizeOptions: [
      { name: 'Small (10")', priceMultiplier: 0.8 },
      { name: 'Medium (12")', priceMultiplier: 1.0 },
      { name: 'Large (14")', priceMultiplier: 1.3 }
    ],
    isAvailable: true
  },
  {
    name: 'Fiery Calabrian Spicy BBQ',
    description: 'Smoky BBQ reduction, pulled spicy chicken, Calabrian chili crisp, red onions, smoked provolone.',
    price: 24.00,
    rating: 4.7,
    category: 'spicy',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
    badge: 'NEW',
    ingredients: ['Smoky BBQ Reduction', 'Spicy Chicken', 'Calabrian Chili', 'Red Onion', 'Smoked Provolone'],
    crustOptions: ['Classic Hand-Tossed', 'Thick Pan Crust'],
    sizeOptions: [
      { name: 'Medium (12")', priceMultiplier: 1.0 },
      { name: 'Large (14")', priceMultiplier: 1.3 }
    ],
    isAvailable: true
  },
  {
    name: 'Garden Harvest Truffle Vegan',
    description: 'Roasted bell peppers, caramelized onions, wild forest mushrooms, baby spinach, avocado garlic crema.',
    price: 21.00,
    rating: 4.9,
    category: 'vegetarian',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85',
    badge: 'VEGAN',
    ingredients: ['Herbed Garlic Oil Base', 'Wild Mushrooms', 'Caramelized Onion', 'Roasted Peppers', 'Vegan Mozzarella'],
    crustOptions: ['Ultra-Thin Crispy', 'Classic Hand-Tossed'],
    sizeOptions: [
      { name: 'Small (10")', priceMultiplier: 0.8 },
      { name: 'Medium (12")', priceMultiplier: 1.0 },
      { name: 'Large (14")', priceMultiplier: 1.3 }
    ],
    isAvailable: true
  },
  {
    name: 'Quattro Formaggi Reserve',
    description: 'Gorgonzola Dolce, Smoked Mozzarella, Fontina, Parmigiano Reggiano, drizzled with wildflower honey.',
    price: 23.50,
    rating: 4.8,
    category: 'gourmet',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
    badge: 'CHEF SPECIAL',
    ingredients: ['Gorgonzola', 'Smoked Mozzarella', 'Fontina', 'Parmigiano', 'Wildflower Honey'],
    crustOptions: ['Classic Hand-Tossed', 'Mozzarella Stuffed Crust'],
    sizeOptions: [
      { name: 'Medium (12")', priceMultiplier: 1.0 },
      { name: 'Large (14")', priceMultiplier: 1.3 }
    ],
    isAvailable: true
  },
  {
    name: 'Smoked Bacon & Hot Honey',
    description: 'Crispy thick-cut smoked bacon, spicy pepperoni, fresh jalapeno rings, whipped ricotta, spicy hot honey drizzle.',
    price: 25.00,
    rating: 4.95,
    category: 'gourmet',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=85',
    badge: 'TOP RATED',
    ingredients: ['San Marzano Tomatoes', 'Thick Bacon', 'Pepperoni', 'Whipped Ricotta', 'Hot Honey Drizzle'],
    crustOptions: ['Classic Hand-Tossed', 'Thick Pan Crust'],
    sizeOptions: [
      { name: 'Medium (12")', priceMultiplier: 1.0 },
      { name: 'Large (14")', priceMultiplier: 1.3 }
    ],
    isAvailable: true
  }
];

export async function GET() {
  try {
    await connectDB();

    // 1. Seed Pizzas
    const existingPizzasCount = await Pizza.countDocuments();
    let seededPizzasCount = 0;
    if (existingPizzasCount === 0) {
      await Pizza.insertMany(INITIAL_PIZZAS);
      seededPizzasCount = INITIAL_PIZZAS.length;
    }

    // 2. Seed Default Admin User
    const existingAdmin = await User.findOne({ email: 'admin@pizzadash.com' });
    let adminCreated = false;
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123456', 10);
      await User.create({
        name: 'PizzaDash Admin',
        email: 'admin@pizzadash.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+8801700000000',
        address: 'PizzaDash HQ, Dhaka, Bangladesh'
      });
      adminCreated = true;
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      seededPizzas: seededPizzasCount,
      adminCreated,
      totalPizzasInDB: existingPizzasCount === 0 ? seededPizzasCount : existingPizzasCount
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
