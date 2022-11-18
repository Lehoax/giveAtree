import axios from "axios";
import React, { useEffect, useState } from "react";
import './square.scss';
import Case from "./Case";

import './modal.scss';
import CaseEmpty from "./CaseEmpty";

const Square = (props) => {
    const [users, setUsers] = useState([]);
    const [trees, setTrees] = useState([]);
    const [squareMaked, setSquareMaked] = useState(false);
    const [requestMaked, setrequestMaked] = useState(false);
    const [casesArr, setCaseArr] = useState([]);

    var squareJson = props.square
    var squareArr = []



   

    const makeSquare = () => {
        let increment = 1;
        let squareSize = 1000;
        let incrementMap = 0;
        for (let i = 0; squareSize !== i; squareSize--) {
            console.log();
            if (props.square.length !== incrementMap) {
                const squareArr = props.square
                console.log(squareArr);
                console.log(incrementMap);
                squareArr.map((squareCase) => {
                    users[0].map((user) => {
                        trees[0].map((tree) => {
                            if (tree._id === squareCase.treeId && user._id === squareCase.userId) {

                                casesArr.push(<Case user={user} tree={tree} squareCase={squareCase} />)
                                incrementMap++
                                increment++

                            }
                        })
                    })
                })
                console.log(casesArr);
            } else {
                casesArr.push(<CaseEmpty uid={props.uid} key={increment} id={increment}/>)
                setCaseArr(casesArr);
                increment++
            }
        }


    }

    useEffect(() => {



        let success = new Array;

        if (requestMaked === false) {
            fetchData();
            async function fetchData() {
                await axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/user/all`,
                    withCredentials: true
                })
                    .then((res) => {
                        setUsers(users.push(res.data));
                        success += 'true,';
                        try {
                            success = success.split(" ");
                        } catch (err) { }
                        if (success[0] === 'true' && success[1] === 'true') {
                            makeSquare();
                            setSquareMaked(true);
                        }
                    })
                    .catch((err) => { console.log(err); });
                await axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/tree/all-placed`,
                    withCredentials: true
                })
                    .then((res) => {
                        setTrees(trees.push(res.data));
                        success += 'true';
                        try {
                            success = success.split(",");
                        } catch (err) { }
                        if (success[0] === 'true' && success[1] === 'true') {
                            makeSquare();
                            setSquareMaked(true);
                        }

                    })
                    .catch((err) => { console.log(err); });
                setrequestMaked(true);


            }
        }


    }, [squareMaked])


    return (
        <>
            
            {squareMaked == true && requestMaked == true ? (
                <div className="square-container">
                    <div>
            <p id="TreeOrderErrors"> </p>
            </div>
                    {casesArr.map((arrcase) => { return arrcase })}
                </div>
            ) : null}

        </>
    );
};



export default Square;