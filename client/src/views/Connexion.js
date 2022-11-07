import { useContext, useState } from "react"
import Api from "../components/Api"
import Auth from "../components/context/Auth"

function Connexion() {
    const { setIsConnected } = useContext(Auth)
    const [user, setUser] = useState({ identifiant: '', mdp: '' })

    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const connexion = async (e) => {
        e.preventDefault()
        Api.post('/visitor/connexion', user).then((msg) => {
            const { success } = msg.data
            if (success) {
                setIsConnected(success)
            }
        }).catch((e) => {
            console.log(e);
        })
    } 

    return (
        <form method="POST" onSubmit={connexion}>
            <h1>Connexion</h1>

            <div>
                <label htmlFor="identifiant">Identifiant</label>
                <input type="text" id="identifiant" name="identifiant" onChange={handleChange}></input>
            </div>

            <div>
                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" id="mdp" name="mdp" onChange={handleChange}></input>
            </div>

            <button type="submit" className='btn btn-primary'>Se connecter</button>
        </form>
    )
}

export default Connexion