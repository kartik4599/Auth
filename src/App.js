import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ChangePass from "./components/Change Pass/ChangePass";
import Layout from "./components/Layout/Layout";
import ContextAuth from "./Context/auth-context";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const cxt = useContext(ContextAuth);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!cxt.isLogin && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/change">
          {cxt.isLogin && <ChangePass />}
          {!cxt.isLogin && <Redirect to="/auth" />}
        </Route>
        <Route path={"*"}>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
