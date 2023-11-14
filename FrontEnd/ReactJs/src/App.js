import './App.css';
import Main from './components/Main';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { handleRefreshRedux } from './redux/users/userAction';

function App (){

  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(handleRefreshRedux());
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );  
}
export default App;

