import React from "react";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./caserEmpty.css";


const promise = loadStripe(process.env.REACT_APP_API_KEY);





export default function CaserEmpty(props) {
  const [wantPayment, setWantPayment] = useState(false);
  const [caseId, setCaseId] = useState(false);


  const handleClick = (event) => {
    navigator.clipboard.readText()
    .then((text)=>{
      if (text.length === 24) {
        setCaseId(event.target.id);
        setWantPayment(true);
      }else{
        document.getElementById('TreeOrderErrors').innerHTML = 'veuillez selectionner un arbre';
      }
    }).catch(err => {
      console.error('Failed to read clipboard contents: ', err);
  });
    

  }

 
  const newOrder = evt => {
    const uid = props.uid;
      setWantPayment(false);
    navigator.clipboard.readText()
        .then(text => {
            const inputfield = document.getElementById(caseId);
            console.log(inputfield);
            console.log('Pasted content: ', text);
            if (text.length === 24) {
                axios({
                    method: "get",
                    url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
                    withCredentials: true,
                }).then((res) => {
                    const user = res.data
                    axios({
                        method: "post",
                        url: `${process.env.REACT_APP_API_URL}api/order/create`,
                        withCredentials: true,
                        data: { userId: uid, treeId: text }
                    }).then((res) => {
                    }).catch((err) => console.log(err))

                }).catch((err) => console.log(err))

            } else {
                document.getElementById('TreeOrderErrors').innerHTML = 'veuillez selectionner un arbre'
            }

        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });

};

const pull_data = (data) => {
  console.log(data); 
  if (data === true) {
    newOrder()
  }
}

  return (
    <>
      <li className="case" id={props.id} key={props.key} onClick={handleClick}></li>

      {wantPayment == true ?(
        <div className="details-modal-content">
              <Elements stripe={promise}>
                <CheckoutForm  func={pull_data}/>
              </Elements>
            </div>
      ):null}

    

    </>


  );
}