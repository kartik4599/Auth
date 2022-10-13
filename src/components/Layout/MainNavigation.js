import { useContext } from "react";
import { Link } from "react-router-dom";
import ContextAuth from "../../Context/auth-context";
import classes from "./MainNavigation.module.css";


const MainNavigation = () => {
  const cxt = useContext(ContextAuth);

  const removeHandler=()=>{
    console.log(cxt.removeId);
    cxt.removeId();
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/auth">Login</Link>
          </li>
          <li>{cxt.isLogin && <Link to="/profile">Profile</Link>}</li>
          <li>{cxt.isLogin && <button onClick={removeHandler}>Logout</button>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
