import "./shop.styles.scss";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "../category/category.component";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //always wrap useEffect async functionality in a function inside useEffect
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray));
    }
    getCategoriesMap();
  }, [dispatch]);

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