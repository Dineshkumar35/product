const commonReducer = (state, action) => {
  switch (action.type) {
    case 'PRODUCT_DATA': 
    console.log(action)
    return {
        ...state,ProductData:action.ProductData
    };
    case "PRODUCT_LIST":
      return {
        ...state,ProductList:action.ProductList
      }
    default: return state;
  }
};
export default commonReducer;