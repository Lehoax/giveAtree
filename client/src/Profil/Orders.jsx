import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./orders.css";
import PDF from "../PDF";
import { PDFDownloadLink} from '@react-pdf/renderer';


const Orders = ({uid, orders, trees, user}) => {
    const [arr, setArr] = useState([])
    const [arrMaked, setArrMaked] = useState(false);
    
    const makeArray = (uid, orders) => {
        orders.map((order) =>{
            if (order.userId === uid) {
                trees.map((tree) =>{
                    if (order.userId === uid && order.treeId === tree._id) {
                        arr.push(tree);
                    }
                })
              setArr(arr);
            }
        })
        console.log(arr);
    }

    useEffect(()=>{
        if (arrMaked === false) {
            makeArray(uid, orders);
            setArrMaked(true);
        }
    })

    return(
        <div className="user-tree-list">
        <h1>order</h1>
        <div className="tree-list">
        {arr.map((tree)=> {
            return( 
                <div className="tree-item">
                    <h4>{tree.specie}</h4>
                    <p>{tree.categorie}</p>
                    <p>{tree.age} ans</p>
                    <p>{tree.price.$numberDecimal} €</p>
                    <PDFDownloadLink document={<PDF user={user} tree={tree}/>} fileName={tree._id+".pdf"}>
                        {({ blob, url, loading, error }) => (loading ? 'Chargement...' : 'Telecharger')}
                    </PDFDownloadLink>
                </div>

            )
        })}
        </div>
        </div>
    )
}

export default Orders;