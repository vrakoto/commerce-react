import { useEffect, useState } from 'react'
import Api from '../components/Api'
import Produit from "../components/cart/Produit"

function Accueil() {
    const [lesProduits, setLesProduits] = useState([])

    useEffect(() => {
        async function lesProduits() {
            Api.get('/general/lesProduits').then((datas) => {
                if (datas) {
                    setLesProduits(datas.data)
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        lesProduits()
    }, [])

    return (
        <>
            <h1>Les Produits</h1>

            {lesProduits.length > 0 && lesProduits.map((leProduit, key) => 
                <Produit key={key} data={leProduit} />
            )}
        </>
    )
}

export default Accueil