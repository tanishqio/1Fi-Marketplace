import { Smartphone } from 'lucide-react';
import Card from './Card';
import { useState } from 'react';
import CategoryPage from './Pages/Category';
import ProductsPage from './Pages/Products';
import BrandsPage from './Pages/Brands';
function MarketPlace() {
  const [Currentpage, setCurrentpage] = useState("Category")
  const [Category, setCategory] = useState("")

  return (<div>
    {Currentpage === "Category" && <CategoryPage setCategory={setCategory} setCurrentpage={setCurrentpage}/>}
    {Currentpage === "Brands" && <BrandsPage />}
    {Currentpage === "Products" && <ProductsPage />}

  </div>)
}
export default MarketPlace


