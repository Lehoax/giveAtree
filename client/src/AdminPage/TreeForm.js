import React, { useState } from "react";
import axios from "axios";

const TreeForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [specie, setSpecie] = useState("");
    const [categorie, setCategorie] = useState("");
    const [age, setAge] = useState("");
    const [price, setPrice] = useState("");





    const handleCreate = async (e) => {
        e.preventDefault();
        
        await axios({
            method: "post",
           
            url: `${process.env.REACT_APP_API_URL}api/tree/create`,
            data: {
                specie,
                categorie,
                age,
                price,
            },
        })
            .then((res) => {
                console.log(res);
                setSpecie("");
                setCategorie("");
                setAge("");
                setPrice("");
                if (res.data.errors) {
                    console.log(res.data.errors);
                } else {
                    setFormSubmit(true);
                }
            })
            .catch((err) => console.log(err));
        
    };

    return (
        <>
     
                <form action="" onSubmit={handleCreate} id="sign-up-form">
                     <label htmlFor="specie">Espèce</label>
                    <br />
                    <input
                        type="text"
                        name="specie"
                        onChange={(e) => setSpecie(e.target.value)}
                        value={specie}
                        required
                    />
                      <br />
                    <label htmlFor="categorie">Categorie</label>
                    <br />
                    <select name="categorie" onChange={(e) => { const selectcat = e.target.value; setCategorie(selectcat)}}>
                        <option></option>
                        <option value="fruitier" >fruitier</option>
                        <option value="biodiversite" >biodiversite</option>
                    </select>
                    <br/>
                    <label htmlFor="age">Age</label>
                    <br />
                    <input
                        type="text"
                        name="age"
                        onChange={(e) => setAge(e.target.value)}
                        value={age}
                    />
                    <div className="pseudo error"></div>
                    <br />
                    <label htmlFor="price">Prix</label>
                    <br />
                    <input
                        type="text"
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <br />
                    <input type="submit" value="creer"/>

                   
                </form>
        </>
    );
};

export default TreeForm;