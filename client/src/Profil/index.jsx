import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Orders from "./Orders";
import "./index.css"

const Profil = ({ uid }) => {
    const [pseudo, setPseudo] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [cp, setCp] = useState("");
    const [user, setUser] = useState(null);
    const [tree, setTree] = useState(null);
    const [order, setOrder] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/update/${uid}`,
            withCredentials: true,
            data: {
                pseudo,
                street,
                city,
                cp,
            },
        })
            .then((res) => {
                console.log(res);
                document.getElementById('update-profil-message').innerHTML = "Modification effectuées"
            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {
        async function getUserData(uid) {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
                withCredentials: true,
            })
                .then((res) => {
                    console.log(res.data);
                    setPseudo(res.data.pseudo);
                    setStreet(res.data.street);
                    setCity(res.data.city);
                    setCp(res.data.cp);
                    setUser(res.data);
                })
                .catch((err) => console.log(err));
        }
        if (user === null) {
            getUserData(uid)
        }
        async function getSquarePlaced() {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/tree/all-placed`,
                withCredentials: true,
            })
                .then((res) => {
                    setTree(res.data);
                })
                .catch((err) => console.log(err));
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/order/all`,
                withCredentials: true,
            })
                .then((res) => {
                    setOrder(res.data.orders);
                })
                .catch((err) => console.log(err));
        }
        if (tree === null) {
            getSquarePlaced()
        }


    }, [user])

    return (
        <>
            <div className="user-profil-container">
                <form action="" onSubmit={handleUpdate} id="sign-up-form">
                    <h1>Profile</h1>
                    <br />
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error"></div>

                    <br />
                    <label htmlFor="street">Adresse</label>
                    <br />
                    <input
                        type="text"
                        name="street"
                        id="street"
                        onChange={(e) => setStreet(e.target.value)}
                        value={street}
                        required
                    />
                    <br />
                    <label htmlFor="city">Ville</label>
                    <br />
                    <input
                        type="text"
                        name="city"
                        id="city"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                    />
                    <br />
                    <label htmlFor="cp">Code postal</label>
                    <br />
                    <input
                        type="text"
                        name="cp"
                        id="cp"
                        onChange={(e) => setCp(e.target.value)}
                        value={cp}
                        required
                    />
                    <br />
                    <input type="submit" value="Modifier profile" />
                    <p id="update-profil-message"></p>
                </form>
                {order !== null && <Orders uid={uid} orders={order} user={user} trees={tree}  />}
            </div>
        </>
    )
}

export default Profil;