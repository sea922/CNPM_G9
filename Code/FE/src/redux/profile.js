const initialState = {
  profile: {
    name: "xxx",
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE": {
      return {
        ...state,
        profile: { ...action.payload },
      };
    }

    default:
      return state;
  }
};
