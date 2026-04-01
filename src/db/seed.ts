import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from './index';
import { menuItems } from './schema';

const sampleMenuItems = [
  {
    name: 'Pan-Seared Scallops',
    description: 'Fresh scallops with cauliflower puree, crispy pancetta, and truffle oil',
    category: 'Starters',
    price: '14.50',
    dietary: ['gluten-free'],
    allergens: ['shellfish', 'dairy'],
    ingredients: ['scallops', 'cauliflower', 'pancetta', 'truffle oil'],
    available: true,
    popularity: 95,
    aiDescription: 'A luxurious starter featuring perfectly seared scallops with a delicate sweetness, complemented by velvety cauliflower puree and the earthy aroma of truffle.',
    pairingRecommendations: ['Chablis', 'Champagne', 'Sauvignon Blanc'],
  },
  {
    name: 'Beef Wellington',
    description: 'Prime beef fillet wrapped in mushroom duxelles and puff pastry, served with red wine jus',
    category: 'Mains',
    price: '32.00',
    dietary: [],
    allergens: ['gluten', 'dairy', 'eggs'],
    ingredients: ['beef fillet', 'mushrooms', 'puff pastry', 'foie gras'],
    available: true,
    popularity: 98,
    aiDescription: 'Our signature dish - tender beef fillet encased in rich mushroom duxelles and golden puff pastry, a true celebration of British fine dining.',
    pairingRecommendations: ['Bordeaux Red', 'Cabernet Sauvignon', 'Malbec'],
  },
  {
    name: 'Wild Mushroom Risotto',
    description: 'Creamy arborio rice with seasonal wild mushrooms, parmesan, and fresh herbs',
    category: 'Mains',
    price: '18.50',
    dietary: ['vegetarian', 'gluten-free'],
    allergens: ['dairy'],
    ingredients: ['arborio rice', 'wild mushrooms', 'parmesan', 'white wine', 'herbs'],
    available: true,
    popularity: 87,
    aiDescription: 'A comforting vegetarian masterpiece with earthy wild mushrooms and perfectly creamy risotto, finished with aged parmesan.',
    pairingRecommendations: ['Pinot Noir', 'Chardonnay', 'Chianti'],
  },
  {
    name: 'Grilled Sea Bass',
    description: 'Whole sea bass with Mediterranean vegetables, lemon butter sauce, and herb oil',
    category: 'Mains',
    price: '26.00',
    dietary: ['gluten-free'],
    allergens: ['fish', 'dairy'],
    ingredients: ['sea bass', 'zucchini', 'bell peppers', 'tomatoes', 'lemon', 'butter'],
    available: true,
    popularity: 91,
    aiDescription: 'Fresh sea bass grilled to perfection, served with vibrant Mediterranean vegetables and a zesty lemon butter sauce.',
    pairingRecommendations: ['Vermentino', 'Albariño', 'Pinot Grigio'],
  },
  {
    name: 'Rack of Lamb',
    description: 'Herb-crusted lamb rack with dauphinoise potatoes, seasonal vegetables, and mint jus',
    category: 'Mains',
    price: '29.00',
    dietary: ['gluten-free'],
    allergens: ['dairy'],
    ingredients: ['lamb rack', 'potatoes', 'cream', 'herbs', 'mint'],
    available: true,
    popularity: 93,
    aiDescription: 'Succulent lamb rack with a fragrant herb crust, accompanied by creamy dauphinoise potatoes and a refreshing mint jus.',
    pairingRecommendations: ['Rioja', 'Syrah', 'Merlot'],
  },
  {
    name: 'Vegan Buddha Bowl',
    description: 'Quinoa, roasted vegetables, avocado, chickpeas, and tahini dressing',
    category: 'Mains',
    price: '16.50',
    dietary: ['vegan', 'vegetarian', 'gluten-free'],
    allergens: ['sesame'],
    ingredients: ['quinoa', 'sweet potato', 'chickpeas', 'avocado', 'kale', 'tahini'],
    available: true,
    popularity: 82,
    aiDescription: 'A vibrant and nutritious plant-based bowl packed with wholesome ingredients and bold flavors.',
    pairingRecommendations: ['Rosé', 'Grüner Veltliner', 'Sparkling Water'],
  },
  {
    name: 'Chocolate Fondant',
    description: 'Warm chocolate fondant with liquid center, vanilla ice cream, and berry coulis',
    category: 'Desserts',
    price: '9.50',
    dietary: ['vegetarian'],
    allergens: ['gluten', 'dairy', 'eggs'],
    ingredients: ['dark chocolate', 'butter', 'eggs', 'flour', 'vanilla ice cream'],
    available: true,
    popularity: 96,
    aiDescription: 'A decadent chocolate lover\'s dream with a molten center that flows like lava, perfectly balanced with vanilla ice cream.',
    pairingRecommendations: ['Port', 'Late Harvest Riesling', 'Coffee'],
  },
  {
    name: 'Lemon Tart',
    description: 'Classic French lemon tart with crisp pastry, tangy lemon curd, and meringue',
    category: 'Desserts',
    price: '8.50',
    dietary: ['vegetarian'],
    allergens: ['gluten', 'dairy', 'eggs'],
    ingredients: ['lemons', 'pastry', 'eggs', 'cream', 'sugar'],
    available: true,
    popularity: 89,
    aiDescription: 'A refreshing citrus dessert with the perfect balance of sweet and tart, finished with delicate meringue.',
    pairingRecommendations: ['Sauternes', 'Moscato', 'Earl Grey Tea'],
  },
  {
    name: 'Cheese Selection',
    description: 'Artisan cheese board with crackers, chutney, and fresh fruit',
    category: 'Desserts',
    price: '12.00',
    dietary: ['vegetarian'],
    allergens: ['dairy', 'gluten'],
    ingredients: ['aged cheddar', 'brie', 'stilton', 'crackers', 'chutney', 'grapes'],
    available: true,
    popularity: 85,
    aiDescription: 'A curated selection of British and European artisan cheeses, perfect for sharing or as a savory finish.',
    pairingRecommendations: ['Port', 'Red Wine', 'Whisky'],
  },
  {
    name: 'Burrata Salad',
    description: 'Creamy burrata with heritage tomatoes, basil, and aged balsamic',
    category: 'Starters',
    price: '12.50',
    dietary: ['vegetarian', 'gluten-free'],
    allergens: ['dairy'],
    ingredients: ['burrata', 'tomatoes', 'basil', 'olive oil', 'balsamic vinegar'],
    available: true,
    popularity: 88,
    aiDescription: 'Fresh Italian burrata paired with sweet heritage tomatoes and fragrant basil, drizzled with aged balsamic.',
    pairingRecommendations: ['Prosecco', 'Pinot Grigio', 'Rosé'],
  },
  {
    name: 'Duck Confit',
    description: 'Slow-cooked duck leg with orange glaze, roasted root vegetables, and crispy skin',
    category: 'Mains',
    price: '24.00',
    dietary: ['gluten-free'],
    allergens: [],
    ingredients: ['duck leg', 'orange', 'carrots', 'parsnips', 'thyme'],
    available: true,
    popularity: 90,
    aiDescription: 'Tender duck confit with crispy skin, complemented by a sweet orange glaze and earthy root vegetables.',
    pairingRecommendations: ['Pinot Noir', 'Côtes du Rhône', 'Orange Wine'],
  },
  {
    name: 'Lobster Thermidor',
    description: 'Half lobster in creamy brandy sauce with parmesan crust',
    category: 'Mains',
    price: '38.00',
    dietary: ['gluten-free'],
    allergens: ['shellfish', 'dairy'],
    ingredients: ['lobster', 'cream', 'brandy', 'parmesan', 'mustard'],
    available: true,
    popularity: 94,
    aiDescription: 'An indulgent classic featuring succulent lobster in a rich, creamy sauce with a golden parmesan crust.',
    pairingRecommendations: ['Champagne', 'White Burgundy', 'Chablis'],
  },
];

export async function seedDatabase() {
  try {
    console.log('Seeding database with menu items...');

    for (const item of sampleMenuItems) {
      await db.insert(menuItems).values(item);
    }

    console.log(`Successfully seeded ${sampleMenuItems.length} menu items!`);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Database seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database seeding failed:', error);
      process.exit(1);
    });
}
