import { Smartphone } from 'lucide-react';
import Card from './Pages/Category/Card';
import { useState } from 'react';
import CategoryPage from './Pages/Category/Category';
import ProductsPage from './Pages/Products/Products';
import BrandsPage from './Pages/Brands/Brands';
import SingleProductPage from './Pages/Products/SingleProductPage';
import { ProductProvider } from '@/context/ProductContext';
function MarketPlace() {
  const [Currentpage, setCurrentpage] = useState("Category")
  const [Category, setCategory] = useState("")
  const [brand, setbrand] = useState("")


  return (
    <ProductProvider>
      <div>
        {Currentpage === "Category" && <CategoryPage setCategory={setCategory} setCurrentpage={setCurrentpage} />}
        {Currentpage === "Brands" && <BrandsPage category={Category} setbrand={setbrand} setCurrentpage={setCurrentpage} />}
        {Currentpage === "Products" && <ProductsPage brand={brand} setCurrentpage={setCurrentpage} />}
        {Currentpage === "SingleProduct" && <SingleProductPage brand={brand} />}
      </div>
    </ProductProvider>)
}
export default MarketPlace


