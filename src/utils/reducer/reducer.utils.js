//function to use with Reducer instead of repeatedly passing type/payload object
export const createAction = (type, payload) => {
  return ({type, payload});
}