import "./shop.styles.scss";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "../category/category.component";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      {/* uses index as the default component to display with 'shop/*' endpoint */}
      <Route path=":category" element={<Category />} />
      {/* path=":[path]" indicates a path that will be passed as a parameter from element */}
    </Routes>
  );
}
 
export default Shop;