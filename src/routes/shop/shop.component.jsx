import "./shop.styles.scss";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "../category/category.component";
import { useEffect } from "react";
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesStart } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  //always wrap useEffect async functionality in a function inside useEffect
  // useEffect(() => {    //moved contents to cat.actions due to Redux Thunk
  //   const getCategoriesMap = async () => {
  //     const categoriesArray = await getCategoriesAndDocuments("categories");
  //     dispatch(setCategories(categoriesArray));
  //   }
  //   getCategoriesMap();
  // }, [dispatch]);

  //with middleware/Thunk - useEffect only calls dispatch on action function
  useEffect(() => {
    // dispatch(fetchCategoriesAsync());   //used with Thunk
    dispatch(fetchCategoriesStart()); //used with Saga - because Saga listening for Start
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      {/* uses index as the default component to display with 'shop/*' endpoint */}
      <Route path=":category" element={<Category />} />
      {/* path=":[path]" indicates a path that will be passed as a parameter from element */}
    </Routes>
  );
};

export default Shop;
