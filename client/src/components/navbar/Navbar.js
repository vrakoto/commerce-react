import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import './navbar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRemove, faUser, faUserPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons'

import Auth from '../context/Auth'
import Api from '../Api'

function Navbar() {
    const { isConnected, setIsConnected } = useContext(Auth)

    const Link = ({ path, title, icon }) => {
        return <NavLink end to={path} className={({ isActive }) => (isActive ? 'link active' : 'link')}><FontAwesomeIcon icon={icon} /> {title}</NavLink>
    }

    const LinkNoRedirect = ({ title, icon, func }) => {
        return <div className="link" onClick={func}><FontAwesomeIcon icon={icon} /> {title}</div>
    }

    const deconnexion = async () => {
        Api.post('/user/logout').then((msg) => {
            if (msg.data) setIsConnected('')
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <aside>

            <div className="header">
                <img src="https://picsum.photos/80" />
                <h3>{isConnected ? `Connecté : ${isConnected}` : "Visiteur"}</h3>
                <hr />
            </div>

            <div className="items">
                <Link path="/" title="Accueil" icon={faHome} />
                {(isConnected) ? 
                    <>
                        <Link path="/panier" title="Panier" icon={faCartShopping} />
                        <LinkNoRedirect title="Déconnexion" icon={faRemove} func={deconnexion} />
                        
                    </>
                :
                    <>
                        <Link path="/connexion" title="Connexion" icon={faUser} />
                        <Link path="/inscription" title="Inscription" icon={faUserPlus} />   
                    </>
                }
            </div>

        </aside>
    )
}

export default Navbar