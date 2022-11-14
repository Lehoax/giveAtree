import axios from "axios";
import React, {useEffect, useState} from "react";
import './square.css'


const Square = (props) => {
    const[user, setUser] = useState('');
    const[tree, setTree] = useState('');
    const[squareMaked, setSquareMaked] = useState(false);
    const[requestMaked, setrequestMaked] = useState(false);
    const [casesArr, setCaseArr] = useState([]);


    const makeSquare = () =>{
        let squareSize = 1000;
        let incrementMap = 0;
        console.log(props);
        for (let i = 0; squareSize !== i; i++){
            console.log(i);
            if (props.square.length !== incrementMap) {
                const squareArr = props.square
                squareArr.map((squareCase) => {
                   
                    casesArr.push(<li key={squareCase._id} id={user._id+"----"+tree._id} className="case"></li>)
                })
            }else{
                    casesArr.push(<li key={squareSize} className="case"></li>)
                }
        }
    } 

    useEffect(()=>{
        if (squareMaked === false) {
            makeSquare();
            setSquareMaked(true);
        }
        if (requestMaked == false) {
            axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/all`,
                withCredentials: true})
                .then((res) => {
                    setUser(res);
                })
                .catch((err) => {console.log(err);});
            axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/tree/all`,
                withCredentials: true})
                .then((res) => {
                    setTree(res);
                })
                .catch((err) => {console.log(err);});
                setrequestMaked(true);
        }

    },[squareMaked])

    return (
        <>
            {squareMaked ?(
                <div className="square-container">
                    {casesArr.map((one_case)=>{return one_case})}
                </div>
            ):(
                <h3>loading</h3>
            )}
        </>
    );
};



export default Square;