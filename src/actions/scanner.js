export const SCAN_ISBN_REQUEST = 'SCAN_ISBN_REQUEST';
export const SCAN_ISBN_SUCCESS = 'SCAN_ISBN_SUCCESS';
export const SCAN_ISBN_FAILURE = 'SCAN_ISBN_FAILURE';

export const scanISBN = (isbn) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SCAN_ISBN_REQUEST });
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const book = response.data.items[0].volumeInfo;
      dispatch({
        type: SCAN_ISBN_SUCCESS,
        payload: {
          title: book.title,
          description: book.description,
          image: book.imageLinks ? book.imageLinks.thumbnail : null,
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: SCAN_ISBN_FAILURE });
    }
  };
};
