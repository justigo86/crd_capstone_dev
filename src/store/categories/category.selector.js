import { createSelector } from "reselect";
//createSelector creates a memoized selector

//selector that receives Redux state to give back category slice of Redux store
const selectCategoryReducer = (state) => state.categories;

//memoized selector - gives back categories array that lives on category slice of Redux state
export const selectCategories = createSelector(
  [selectCategoryReducer],    //array as input selectors - parameters - in this case selector slices
  (categorySlice) => categorySlice.categories  //output - using input selectors as params
      //output func will only run if selectCategoryReducer slice is different
)

//same as above - if selectCatogies does not change, do not rerun the reducer
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);

//data pulled from Firebase is pulled as Array in firebase.utils (state.categories.categories)
  //data then reduced into selectCatrgoriesMap by 