
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  // Made optional as many mock products lack this field and it is currently unused in the UI
  longDescription?: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  howToUse: string;
  ingredients: string[];
  benefits: string[];
  skinType: string;
  texture: string;
  size?: string;
}

export enum Category {
  ANTHELIOS = 'Anthelios',
  EFFACLAR = 'Effaclar',
  LIPIKAR = 'Lipikar',
  HYALU_B5 = 'Hyalu B5',
  CICAPLAST = 'Cicaplast',
  RETINOL = 'Retinol',
  VITAMINA_C = 'Vitamina C',
  MELA_B3 = 'Mela B3'
}

export interface CartItem extends Product {
  quantity: number;
}