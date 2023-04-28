import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./user.types";

export const setCategoryMap = (category) =>
  createAction( CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, category );