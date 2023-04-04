export const fetchData = () => {
    return (dispatch) => {
      dispatch(fetchDataRequest());
      fetch('https://your-api-url.com/data')
        .then(response => response.json())
        .then(data => {
          dispatch(fetchDataSuccess(data));
        })
        .catch(error => {
          dispatch(fetchDataFailure(error.message));
        });
    };
  };
  
  export const fetchDataRequest = () => {
    return {
      type: 'FETCH_DATA_REQUEST'
    };
  };
  
  export const fetchDataSuccess = (data) => {
    return {
      type: 'FETCH_DATA_SUCCESS',
      payload: data
    };
  };
  
  export const fetchDataFailure = (error) => {
    return {
      type: 'FETCH_DATA_FAILURE',
      payload: error
    };
  };
  