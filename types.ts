export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
};

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: number;
    isFeatured: boolean;
    size: Size;
    colors: Color[];
    images: Image[];
    offer: number;
    stock: number; // existing field
    quantity: number; // new field
    description: string;
};

export interface Review {
    data: Review[];
    id: string;
    productId: string;
    product: Product[];
    author: string;
    comment: string;
    rating: number;
    avatar: string; 
    phone: string; 
}

export interface Size {
    id: string;
    name: string;
    value: string;
};

export interface Color {
    id: string;
    name: string;
    value: string;
};

export interface Image {
    id: string;
    url: string;
};

export interface BlockIps {
    ipAddress: string;
    isBlocked: boolean;
}

export interface AvatarImage {
    id: string;               
    url: string;               // URL of the avatar image
    description?: string;     
    createdAt: Date;           
    updatedAt: Date;           
}

export interface SiteSettings {
    id: string;
    logoUrl?: string;
    shippingOptions: any;       // Define the actual type for shipping 
    createdAt: Date;
    updatedAt: Date;
}

export interface Coupon {
    isValid: boolean;
    data: any;
    id: string;                      // Unique identifier for the coupon
    code: string;                    // Unique code for the coupon
    discountAmount: number;          // Discount amount (use Decimal or number type)
    discountType: 'PERCENTAGE' | 'FIXED'; // Type of discount
    startDate: Date;                 // Start date of the coupon validity
    endDate: Date;                   // End date of the coupon validity
    isActive: boolean;               // Status of the coupon (active/inactive)
    usageCount: number;              // Count of how many times the coupon has been used
    maxUsageLimit?: number;          // Optional limit for usage
    createdAt: Date;                 // Timestamp of when the coupon was created
    updatedAt: Date;                 // Timestamp of the last update
}


