import * as TYPES from "../constants";
const initialState = { data: [], singleData: {}, isLoading: false };

export const actionCreators = {
  requestProductsData: () => async dispatch => {
    dispatch({ type: TYPES.requestDataType });

    const url = "api/products";
    const response = await fetch(url);
    const data = await response.json();

    dispatch({ type: TYPES.receiveDataType, data });
  },

  requestSingleProduct: prodId => async dispatch => {
    dispatch({ type: TYPES.requestSingleDataType });

    const url = `api/products/${prodId}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    dispatch({ type: TYPES.receiveSingleDataType, data });
  },

  updateSingleProduct: item => async dispatch => {
    dispatch({ type: TYPES.updateSingleDataType });
    const url = "api/products";
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    const data = { success: response.ok, status: response.status };
    dispatch({ type: TYPES.receiveUpdateSingleDataType, data });
  },

  createSingleProduct: item => async dispatch => {
    dispatch({ type: TYPES.createNewDataType });
    const url = "api/products";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    const data = await response.json();
    dispatch({ type: TYPES.receiveCreateNewDataType, data });
  },

  clearResponse: () => async dispatch => {
    dispatch({ type: TYPES.clearStatusType });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case TYPES.requestDataType:
      return {
        ...state,
        isLoading: true
      };

    case TYPES.receiveDataType:
      return {
        ...state,
        data: action.data,
        isLoading: false
      };

    case TYPES.requestSingleDataType:
      return {
        ...state,
        isLoading: true
      };

    case TYPES.receiveSingleDataType:
      return {
        ...state,
        singleData: action.data,
        isLoading: false
      };

    case TYPES.updateSingleDataType:
      return {
        ...state,
        isLoading: true
      };

    case TYPES.receiveUpdateSingleDataType:
      return {
        ...state,
        response: action.data,
        isLoading: false
      };

    case TYPES.createNewDataType:
      return {
        ...state,
        isLoading: true
      };

    case TYPES.receiveCreateNewDataType:
      return {
        ...state,
        response: action.data,
        isLoading: false
      };

    case TYPES.clearStatusType:
      return {
        ...state,
        response: null,
        isLoading: false
      };

    default:
      return state;
  }
};
