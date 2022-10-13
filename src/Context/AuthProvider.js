import { useEffect, useReducer } from "react";
import ContextAuth from "./auth-context";

const AuthProvider = (props) => {
  const deafultID = {
    id: "",
    isLogin: false,
  };

  const idReducer = (state, action) => {
    if (action.type === "Add") {
      localStorage.setItem("login", action.id);
      console.log("done");
      return {
        id: action.id,
        isLogin: true,
      };
    }

    if (action.type === "local") {
      return {
        id: action.id,
        isLogin: true,
      };
    }

    if (action.type === "Remove") {
      localStorage.removeItem("login");
      return {
        id: "",
        isLogin: false,
      };
    }

    return deafultID;
  };

  const [idState, dispatchId] = useReducer(idReducer, deafultID);

  const addHandler = (id) => {
    dispatchId({ type: "Add", id: id });
  };

  const removeHandler = () => {
    dispatchId({ type: "Remove" });
  };

  //local storage
  useEffect(() => {
    const isLogin = localStorage.getItem("login");
    if (isLogin) {
      dispatchId({ type: "local", id: isLogin });
    }
  }, []);

  const auth = {
    id: idState.id,
    addId: addHandler,
    removeId: removeHandler,
    isLogin: idState.isLogin,
  };

  return (
    <ContextAuth.Provider value={auth}>{props.children}</ContextAuth.Provider>
  );
};

export default AuthProvider;
