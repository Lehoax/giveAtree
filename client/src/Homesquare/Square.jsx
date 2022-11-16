import axios from "axios";
import React, { useEffect, useState } from "react";
import './square.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Square = (props) => {
    const [users, setUsers] = useState([]);
    const [trees, setTrees] = useState([]);
    const [squareMaked, setSquareMaked] = useState(false);
    const [requestMaked, setrequestMaked] = useState(false);
    const [casesArr, setCaseArr] = useState([]);


  



    const newOrder = evt => {
        console.log(props);
        const uid = props.uid;
        navigator.clipboard.readText()
        .then(text => {
            const inputfield = evt.target
            console.log('Pasted content: ', text);
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/order/create`,
                withCredentials: true,
                data: {userId: uid, treeId: text}
            }).then((res) => {
                console.log(res);
            }).catch((err) => console.log(err))

        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    
    };



    const makeSquare = () => {
        let increment = 1;
        let squareSize = 1000;
        let incrementMap = 0;
        for (let i = 0; squareSize !== i; squareSize--) {
            if (props.square.length !== incrementMap) {
                const squareArr = props.square
                console.log(squareArr);
                console.log(incrementMap);
                squareArr.map((squareCase) => {
                    setUsers(users.join('').split(','))
                    users[0].map((user) => {
                        if (user._id === squareCase.userId) {
                            trees[0].map((tree) => {
                                if (tree._id === squareCase.treeId) {
                                    casesArr.push(<>
                                        <div id="overlay3">
                                            <div className="popup_block">
                                                <a className="close" href="#noWhere">close</a>
                                                <h2>{user.pseudo}</h2>

                                                <p>{tree.specie} </p>
                                                <p>{tree.age} ans</p>

                                                <p>{tree.categorie} </p>
                                                <p>{tree.price.$numberDecimal} € </p>
                                            </div>
                                        </div>
                                        <a href="#overlay3" className={tree.categorie}><li key={squareCase._id} className="case"></li></a></>);
                                        setCaseArr(casesArr);
                                        incrementMap++
                                }
                            })
                        }
                    })
                })
            } else {
                casesArr.push(<input key={increment} onClick={newOrder} className="case"></input>)
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
                        console.log(res.data);
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
                        console.log(res.data);
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
            {squareMaked && requestMaked ? (
                <div className="square-container">
                    {casesArr.map((one_case) => { return one_case })}
                </div>
            ) : (
                <h3>loading</h3>
            )}

        </>
    );
};



export default Square;