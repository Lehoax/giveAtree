import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import AuthForm from './AuthForm';
import HomeSquare from './Homesquare';
import AdminPage from './AdminPage';
import homeTree from "./home-tree.jpg"
import Profil from './Profil';

function App() {
  const [uid, setUid] = useState(null);
  let [user, setUser] = useState(null);
  let [alertBox, setAlertBox] = useState(false);

  function AlertBox() {
    alert('Ce site est un prototype ne saisissez pas vos vraies informations. Pour le paiement en carte saisissez le n° de carte 4242 4242 4242 4242');
    setAlertBox(true);
  }


  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
            withCredentials: true,
          })
            .then((res) => {
              setUser(user = res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log("No token"));

    };
    fetchToken();
    
  }, [uid]);

  
  return (
    <>
    <div className="App">
    <div className="container-title">
      <h1 id='app-title'>Give a tree</h1>
      <p>Planter un arbre pour la collectivité, association loi 1901, vos dons sont déductibles de vos impôts</p>
    </div>

      {user && user.admin == true &&(
        <AdminPage/>
        )}
      {uid != null ? (
        <div>
        <HomeSquare uid={uid}/>
        <Profil uid={uid}/>
        </div>
      ):(
        <div className="home-form">
          <a href="https://fr.freepik.com/vecteurs-libre/arbre_6132448.htm#query=tree&position=9&from_view=search&track=sph" target="_blank">
            <img src={homeTree} id="home-tree" />
          </a>
        <AuthForm />
        </div>
      )}
    </div>
      <div className='footer'>
      <a href='https://www.linkedin.com/in/leolair/' target="_blank"> 
      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className='footer_logo'/>
      </a>
      <a href='https://github.com/Lehoax/giveAtree' target="_blank"> 
      <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className='footer_logo'/>
      </a>
    </div>
    {alertBox == false && AlertBox()}
    </>
     
  );
}

export default App;
