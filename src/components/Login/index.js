import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as loginAction } from "../../redux/reducers/Reducer";
import { useNavigate } from 'react-router-dom';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { auth } = useSelector((state) => state.reducer);

  useEffect(() => {
   if(auth){
    navigate('/dashboard');
   }
  }, [auth,navigate]);

  const handleSubmit=()=>{
    dispatch(loginAction.login(email,password));
  }

  return (
    <div className="container">
        <h2 style={{textAlign: 'center'}}>Login</h2>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" placeholder="Enter email" id="email" 
                   onChange={(e)=>{setEmail(e.target.value)}}
            />
        </div>
        <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" placeholder="Enter password" id="pwd"
                    onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default React.memo(Login);
