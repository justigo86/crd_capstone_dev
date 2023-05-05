import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CATEGORIES_ACTION_TYPES from "./category.types";

//accumulated that holds all sagas related to the Category

//copied async thunk func from category.action - will then use code within generator function
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments("categories");
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    //call takes callable function and passes second argument as a parameter to it
    //in this case - get categories array from store
    yield put(fetchCategoriesSuccess(categoriesArray));
    //put is a dispatch call - cannot use dispatch - called here if call() is successful
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
    //called if call() fails
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
  //as soon as you hear FETCH_CATEGORIES_START, run the code in fetchCategoriesAsync
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
