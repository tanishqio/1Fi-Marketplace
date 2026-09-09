import { createContext,useState } from "react";

export const ProductContext=createContext();

export function ProductProvider({children}:any){
    const [productid,setproductid]=useState(null);
  return   (<ProductContext.Provider value={{productid,setproductid}}>
    {children}
  </ProductContext.Provider>
);}