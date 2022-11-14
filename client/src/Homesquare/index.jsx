import React, {useEffect, useState} from "react";
import axios from 'axios';


const HomeSquare= () => {
  const [squares, setSquare] = useState(null);
  const [isSend, setIsSend] = useState(false);


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
        {squares.map((square)=>{
            return <li>{square._id}</li>
        })}
      </>
    )}
     
    </>
  );
};



export default HomeSquare;