import React, { useContext, useEffect } from "react";
import Books from "../books/Books";
import BookForm from "../books/BookForm";
import BookFilter from "../books/BookFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className="grid-2">
      <div>
        <BookForm />
      </div>
      <div>
        <BookFilter />
        <Books />
      </div>
      <h1>Home</h1>
    </div>
  );
};
export default Home;
