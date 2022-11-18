import react from 'react';
import './tree.css'
import './index.css'

const Tree = ({props}) => {
    const id = props._id;
    const specie = props.specie;
    const categorie = props.categorie;
    const price = props.price.$numberDecimal;
    const age = props.age;
    console.log(price);
    function copyToClipboard(id) {     
      console.log(id);
      navigator.clipboard.writeText(id);
      document.getElementById("tree"+id).style.cssText += 'display:none;';
      }
    return (
        <>
        <div className="tree" id={"tree"+id}>
            <h5>{specie}</h5>
            <p>{age} ans</p>

            <p className={categorie+" cat-list"}>{categorie}</p>
            <p>{price} €</p>
            <button className="button-4" id={id} onClick={() => copyToClipboard(id)}>Planter</button>
        </div>
        </>
    )
}

export default Tree;