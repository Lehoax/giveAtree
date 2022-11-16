import React, {useEffect, useState} from "react";
import axios from 'axios';
import Square from "./Square";
import TreeList from './TreeList';
import './index.css'


const HomeSquare= ({uid}) => {
  const [squares, setSquare] = useState(null);
  const [isSend, setIsSend] = useState(false);
  const userid = uid;

  useEffect(()=>{
    if (isSend === false) {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/square/`,
        }).then((res) => {
            setSquare(res.data);
            setIsSend(true);
            console.log(res.data);
        })
    } 

  });

  return (
    <>
    {squares === null ?(
      <>
        <h2>Loading</h2>
      </>

    ): (
      <>
      <div className="home-container">
      <TreeList/>

        <Square square={squares} uid={userid}/>
      </div>
      </>
    )}
     
    </>
  );
};



export default HomeSquare;