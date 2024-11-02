import React, { useReducer } from "react";
import BookContext from "./bookContext";
import bookReducer from "./bookReducer";
import {
  ADD_BOOK,
  DELETE_BOOK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_FILTER,
  BOOK_ERROR,
  CLEAR_BOOKS,
  GET_BOOKS,
} from "../types";
import axios from "axios";

const BookState = (props) => {
  const initialState = {
    books: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  const getBooks = async () => {
    try {
      const res = await axios.get("/api/books");
      dispatch({ type: GET_BOOKS, payload: res.data });
    } catch (error) {
      dispatch({ type: BOOK_ERROR, payload: error.response.message });
    }
  };

  const addBook = async (book) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/books", book, config);
      dispatch({ type: ADD_BOOK, payload: res.data });
    } catch (error) {
      dispatch({ type: BOOK_ERROR, payload: error.response.message });
    }
  };

  const updateBook = async (book) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/books/${book._id}`, book, config);
      dispatch({ type: UPDATE_BOOK, payload: res.data });
    } catch (error) {
      dispatch({ type: BOOK_ERROR, payload: error.response.message });
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      dispatch({ type: DELETE_BOOK, payload: id });
    } catch (error) {
      dispatch({ type: BOOK_ERROR, payload: error.response.message });
    }
  };

  const clearBooks = () => {
    dispatch({ type: CLEAR_BOOKS });
  };

  const setCurrent = (book) => {
    dispatch({ type: SET_CURRENT, payload: book });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const filterBooks = (text) => {
    dispatch({ type: FILTER_BOOKS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addBook,
        updateBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        filterBooks,
        clearFilter,
        getBooks,
        clearBooks,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
