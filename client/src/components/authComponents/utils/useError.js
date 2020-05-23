
import React from 'react'


const useError = (initialState) => {
  initialState = initialState ? initialState : null;
  const [error, setError] = React.useState(initialState);
  const showError = errorMessage => {
    setError(errorMessage);
    window.setTimeout(() => {
      setError(null);
    }, 4000);
  };
  return { error, showError };
};

export default useError;