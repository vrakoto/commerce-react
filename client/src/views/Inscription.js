import { useEffect, useState } from "react";
import Api from '../components/Api';

function Inscription() {
    const initialFormState = { identifiant: '', mdp: '', mdp_c: '' }
    const [user, setUser] = useState(initialFormState)

    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleVerification = (e) => {
        e.preventDefault()
        let valid = true

        if (user.identifiant.length < 3) {
            valid = false
            setError(prev => ({...prev, identifiant: "L'identifiant est trop court"}))
        }

        if (user.mdp.length < 3) {
            valid = false
            setError(prev => ({...prev, mdp: "Le mot de passe  est trop court"}))
        }

        if (user.mdp !== user.mdp_c) {
            valid = false
            setError(prev => ({...prev, mdp: "Les mots de passes ne sont pas correspondant"}))
        }

        if (valid) {
            inscription()
        }
    }

    const inscription = async () => {
        Api.post('/visitor/inscription', user).then((msg) => {
            if (msg.data) console.log(msg.data);
        }).catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        // console.log(error);
    }, [error])

    return (
        <form method='post' onSubmit={handleVerification}>

                           
            <h1>Inscription</h1>

            <div>
                <label htmlFor="identifiant">Identifiant</label>
                <input type="text" name="identifiant" onChange={handleChange} value={user.identifiant} autoFocus></input>
                {/* <p style={{ color: 'red' }}>{fieldsError.identifiant}</p> */}
            </div>

            <div>
                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" name="mdp" onChange={handleChange} value={user.mdp} ></input>
                {/* <p style={{ color: 'red' }}>{fieldsError.mdp}</p> */}
            </div>

            <div>
                <label htmlFor="mdp_c">Confirmer le mot de passe</label>
                <input type="password" name="mdp_c" onChange={handleChange} ></input>
                {/* <p style={{ color: 'red' }}>{fieldsError.mdp_c}</p> */}
            </div> 

            <button type="submit" className="btn btn-success">S'inscrire</button>
        </form>
    )
}

export default Inscription