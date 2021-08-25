export interface IDoc {
    image: string; 
    productId: string;
    title: string;
    active: boolean;
    key: string;
    soldout: boolean;
  }

  export interface IExtra extends IDoc {
    maxlimit: number;
  }
