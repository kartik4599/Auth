import React from "react";

const ContextAuth = React.createContext({
  id: "",
  addId: (id) => {},
  removeId: () => {},
  isLogin: false,
});

export default ContextAuth;
