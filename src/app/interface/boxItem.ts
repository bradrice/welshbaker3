export interface boxItem {
    productId: string;
    title: string;
    quantity: number;
    category: string;
    ExcludedId?: string[];
    soldout: boolean;
}

export interface extraItem extends boxItem {
  maxlimit: number;
}

