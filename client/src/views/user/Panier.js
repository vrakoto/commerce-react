import { useState } from 'react'
import Api from '../../components/Api'
// import Produit from '../../components/cart/Produit'

function Panier() {
    const [lesProduits, setLesProduits] = useState(() => {
        async function getProduits() {
            Api.get('/user/panier').then((datas) => {
                if (datas.data) setLesProduits(lesProduits)
            }).catch((e) => {
                console.log(e);
            })
        }
        getProduits()
    })

    return (
        <>
            <h1>Mon panier</h1>

            {/* {lesProduits.length > 0 && lesProduits.map((leProduit, key) => 
                <Produit key={key} data={leProduit} />
            )} */}
        </>
    )
}

export default Panier