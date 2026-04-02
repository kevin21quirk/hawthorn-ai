import { MenuData } from '@/types/menu';

// Sample data structure - you can populate this with your actual menu items
export const mainMenuData: MenuData = {
  title: 'Main Menu',
  description: 'Signature dishes and chef\'s specialties',
  pdfUrl: '/menus/images/06.02.0206-Main-Menu_page-0001.jpg',
  sections: [
    {
      title: 'Starters',
      items: [
        {
          name: 'Example Starter',
          description: 'A delicious starter with seasonal ingredients',
          price: '£8.50',
          dietary: ['V']
        }
        // Add more items here
      ]
    },
    {
      title: 'Main Courses',
      items: [
        {
          name: 'Example Main Course',
          description: 'Chef\'s signature dish with locally sourced ingredients',
          price: '£18.50'
        }
        // Add more items here
      ]
    },
    {
      title: 'Desserts',
      items: [
        {
          name: 'Example Dessert',
          description: 'Homemade sweet treat',
          price: '£7.50',
          dietary: ['V']
        }
        // Add more items here
      ]
    }
  ]
};

export const daytimeMenuData: MenuData = {
  title: 'Daytime Menu',
  description: 'Light options perfect for lunch and early dining',
  pdfUrl: '/menus/images/06.02.0206-Daytime-Menu_page-0001.jpg',
  sections: [
    {
      title: 'Light Bites',
      items: [
        // Add items here
      ]
    }
  ]
};

export const childrenMenuData: MenuData = {
  title: 'Children\'s Menu',
  description: 'Kid-friendly meals with healthy options',
  pdfUrl: '/menus/images/06.02.0206-Children-Menu_page-0001.jpg',
  sections: [
    {
      title: 'Kids Favorites',
      items: [
        // Add items here
      ]
    }
  ]
};

export const sundayMenuData: MenuData = {
  title: 'Sunday Specials',
  description: 'Weekend favorites and family-style dining',
  pdfUrl: '/menus/images/SUNDAY-spcls-dated-22-July2025_page-0001.jpg',
  sections: [
    {
      title: 'Sunday Roasts',
      items: [
        // Add items here
      ]
    }
  ]
};

// Dessert menu uses flipbook (multi-page), not structured display
// export const dessertMenuData: MenuData = {
//   title: 'Dessert Menu',
//   description: 'Sweet endings and seasonal treats',
//   pdfUrl: '/menus/images/31.08.2025-Dessert-Menu-2025_page-0001.jpg',
//   sections: [
//     {
//       title: 'Sweet Treats',
//       items: [
//         // Add items here
//       ]
//     }
//   ]
// };
