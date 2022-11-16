import react from 'react';
import './tree.css'

const Tree = ({props}) => {
    const id = props._id;
    const specie = props.specie;
    const categorie = props.categorie;
    const price = props.price.$numberDecimal;
    const age = props.age;
    console.log(price);
    function copyToClipboard(id) {     
      console.log(id);
         // Copy the text inside the text field
        navigator.clipboard.writeText(id);
      
        // Alert the copied text
        alert("Copied the text: " + id);
      }
    return (
        <>
        <div className="tree">
            <h5>{specie}</h5>
            <p>{categorie}</p>
            <p>{price} €</p>
            <p>{age} ans</p>
            <button id={id} onClick={() => copyToClipboard(id)}>Planter</button>
        </div>
        </>
    )
}

export default Tree;