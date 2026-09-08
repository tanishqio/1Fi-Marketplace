import { Smartphone } from 'lucide-react';
import Card from './Pages/Category/Card';
import { useState } from 'react';
import CategoryPage from './Pages/Category/Category';
import ProductsPage from './Pages/Products/Products';
import BrandsPage from './Pages/Brands/Brands';
function MarketPlace() {
  const [Currentpage, setCurrentpage] = useState("Category")
  const [Category, setCategory] = useState("")

  return (<div>
    {Currentpage === "Category" && <CategoryPage setCategory={setCategory} setCurrentpage={setCurrentpage}/>}
    {Currentpage === "Brands" && <BrandsPage category ={Category}/>}
    {Currentpage === "Products" && <ProductsPage />}

  </div>)
}
export default MarketPlace


