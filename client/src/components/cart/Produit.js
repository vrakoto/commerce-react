import { useContext } from 'react'
import './cardProduit.css'

import Auth from '../context/Auth'

function Produit ({data})  {
    const { isConnected } = useContext(Auth)
    const { reference, description, prix, publication } = data

    return (
        <div className="card">
            <h1>{reference}</h1>
            <h3>{description}</h3>
            <h5>{prix}</h5>
            <h5>{publication}</h5>
            
            {isConnected ? (
                <button>Supprimer</button>
            ) : ''}
        </div>
    )
}

export default Produit