
import React from 'react'

const useError = (initialState) => {
  initialState = initialState ? initialState : null;
  const [error, setError] = React.useState(initialState);
  const showError = errorMessage => {
    setError(errorMessage);
  };
  return { error, showError };
};

export default useError;