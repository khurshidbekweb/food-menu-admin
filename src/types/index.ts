

export interface navLinkType{
    icon: React.ReactNode,
    path: string,
    element: string
} 

export interface User{
    _id: string; 
    username: string; 
    password: string; 
    role: "SUPER_ADMIN" | "ADMIN" | "USER"; 
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface lanuage{
    _id: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    name: string;
    __v: number;
}  
 export interface Language {
    _id: string;
    name: string;
    code: string;
    image: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
  }
  
 export interface Restaurant {
    restaurant: null;
    _id: string;
    name: string;
    description: string;
    image: string;
    user: User;
    languages: Language[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    // categories: any[];
  }
  export interface CategoryIMG {
    _id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description: any;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
  