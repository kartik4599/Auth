import { useReducer } from "react";
import ContextAuth from "./auth-context";

const AuthProvider = (props) => {
  const deafultID = {
    id: "",
    isLogin: false,
  };

  const idReducer = (state, action) => {
    if (action.type === "Add") {
      return {
        id: action.id,
        isLogin: true,
      };
    }

    if (action.type === "Remove") {
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
