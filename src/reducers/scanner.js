import { SCAN_ISBN_REQUEST, SCAN_ISBN_SUCCESS, SCAN_ISBN_FAILURE } from '../actions/scanner';

const initialState = {
  scanned: false,
  bookData: {},
  loading: false,
  error: null,
};

const scannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCAN_ISBN_REQUEST:
      return { ...state, loading: true };
    case SCAN_ISBN_SUCCESS:
      return { ...state, scanned: true, bookData: action.payload, loading: false, error: null };
    case SCAN_ISBN_FAILURE:
      return { ...state, loading: false, error: 'Une erreur s\'est produite lors de la recherche du livre.' };
    default:
      return state;
  }
};

export default scannerReducer;
