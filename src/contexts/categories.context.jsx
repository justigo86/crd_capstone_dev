import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

//was previously products - updated to categoriesMap due to data type store in Firebase
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  //only ran once in order to populate the db
    //not normally how it's done - 
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, [])
  useEffect(() => {
    //always wrap useEffect async functionality in a function inside useEffect
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};