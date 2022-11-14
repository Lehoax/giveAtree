import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import AuthForm from './AuthForm';
import HomeSquare from './Homesquare';

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, [uid]);

  
  return (
    <div className="App">
      <h4>app</h4>
      {uid != null ? (
        <h4>Logged {uid}</h4>
      ):(
        <AuthForm />
      )}
      <HomeSquare/>
    </div>
  );
}

export default App;
