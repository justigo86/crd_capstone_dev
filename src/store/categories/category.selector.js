export const selectCategoriesMap = (state) =>
  state.categories.categories
  .reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

//data pulled from Firebase is pulled as Array in firebase.utils (state.categories.categories)
  //data then reduced into selectCatrgoriesMap by 