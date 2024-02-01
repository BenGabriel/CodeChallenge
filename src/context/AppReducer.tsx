export default (state: any, action: any) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "TRANSACTION":
      return { ...state, transaction: [...state.transaction, action.payload] };
    case "GET_TRANSACTION":
      return { ...state, transaction: action.payload };
    case "WALLET":
      return { ...state, wallet: action.payload };
    default:
      return state;
  }
};
