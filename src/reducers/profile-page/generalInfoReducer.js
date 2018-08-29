const initialState = {
  id: "",
  name: "",
  surname: "",
  gender: "",
  birthday: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_GENERAL_INFO":
      return { ...action.generalInfo };
    case "UPDATE_GENERAL_INFO":
      return { ...state, ...action.generalInfo };
    default:
      return state;
  }
};
