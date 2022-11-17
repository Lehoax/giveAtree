import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Tree from "./Tree";


const TreeList = () => {
    const [requestMaked, setrequestMaked] = useState(false);

    const [trees, setTrees] = useState([]);

    useEffect(() => {
        let success = [];

        if (requestMaked === false) {
            fetchData();
            async function fetchData() {
                await axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/tree/all`,
                    withCredentials: true
                })
                        .then((res) => {
                            console.log(res.data);
                            setTrees(res.data);
                            success += 'true';
                            if (success[0] === 'true') {
                                setrequestMaked(true);
                            }
                        })
                        .catch((err) => { console.log(err); });
                   
                    setrequestMaked(true);

                           
        }
    }
    }, [requestMaked])

    return (
        <>
            {requestMaked ? (
                <div >
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                
                    {trees.map((tree) => { return <Tree props={tree} />  })}
                    </div>
            ) : (
                <h3>loading</h3>
            )}
              
        </>
    );
};


export default TreeList;
