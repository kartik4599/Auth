import { useContext, useRef } from "react";
import ContextAuth from "../../Context/auth-context";
import classes from "./ChangePass.module.css";


const ChangePass = () => {
  const newPass = useRef();
  const cxt = useContext(ContextAuth);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBP8kanqzI5kp3ArEukdpOp7NjnV7fgnJ8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: cxt.id,
          password: newPass.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      cxt.addId(data.idToken);
      alert("Done");
      console.log(data);
    } else {
      const data = await res.json();
      alert(data.error.message);
    }
  };

  return (
    <div className={classes.change}>
      <h3>Change Password</h3><br/>
      <form onSubmit={submitHandler}>
        <label>Enter New Password</label><br/>
        <input ref={newPass} type="password" /><br/>
        <button>Change Password</button>
      </form>
    </div>
  );
};

export default ChangePass;
