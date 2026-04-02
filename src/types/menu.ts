export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  dietary?: string[]; // e.g., ['V', 'GF', 'VE'] for Vegetarian, Gluten-Free, Vegan
  allergens?: string[];
}

export interface MenuSection {
  title: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuData {
  title: string;
  description: string;
  sections: MenuSection[];
  pdfUrl?: string; // Optional PDF download link
}
