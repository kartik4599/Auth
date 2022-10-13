import { Switch, Route } from "react-router-dom";
import ChangePass from "./components/Change Pass/ChangePass";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthProvider from "./Context/AuthProvider";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/change">
            <ChangePass/>
          </Route>
        </Switch>
      </Layout>
    </AuthProvider>
  );
}

export default App;
