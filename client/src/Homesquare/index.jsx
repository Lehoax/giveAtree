import React, { useEffect, useState } from "react";
import axios from 'axios';
import Square from "./Square";
import TreeList from './TreeList';
import './index.css'


const HomeSquare = ({ uid }) => {
  const [squares, setSquare] = useState(null);
  const [isSend, setIsSend] = useState(false);
  const userid = uid;

  const pull_data = (data) => {
    if (data === true) {
      console.log("pull data truie");
    }
  }

  useEffect(() => {
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
    

  },[pull_data]);

  return (
    <>
      {squares === null ? (
        <>
          <h2>Loading</h2>
        </>

      ) : (
        <>
          <div>
            <p id="TreeOrderErrors"> </p>
          </div>
          <div className="home-content" id="home-cursor">

            <TreeList func={pull_data} />
            <Square square={squares} uid={userid} />
          </div>
        </>
      )}

    </>
  );
};



export default HomeSquare;