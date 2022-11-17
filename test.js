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
                                        increment++

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