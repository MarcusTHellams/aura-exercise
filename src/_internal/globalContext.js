import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import { mockFetch } from '../util/mockFetch';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const types = {
  loading: 'LOADING',
  success: 'SUCCESS',
  error: 'ERROR',
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.loading:
      return { ...state, loading: true, error: null };
    case types.success:
      return { ...state, loading: false, data: payload };
    case types.error:
      return { ...state, loading: false, data: [], error: payload };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [{ loading, error, data }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getRecords = useCallback(async () => {
    dispatch({ type: types.loading });
    try {
      const response = await mockFetch()();
      dispatch({ type: types.success, payload: response });
    } catch (error) {
      dispatch({ type: types.error, payload: error.message });
    }
  }, []);

  const value = {
    data,
    error,
    getRecords,
    loading,
  };

  return (
    <GlobalContext.Provider {...{ value }}>{children}</GlobalContext.Provider>
  );
};
