import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Api from '../components/Api'
import Auth from '../components/context/Auth'

import Body from '../components/Body'

import Accueil from '../views/Accueil'
import NotFound from '../views/NotFound'
import Connexion from '../views/Connexion';
import Inscription from '../views/Inscription';
import Panier from '../views/user/Panier'

function Routeur() {
    const [isConnected, setIsConnected] = useState(() => {
        async function getLogin() {
            Api.get('/general/login').then((datas) => {
                if (datas.data) setIsConnected(datas.data)
            }).catch((error) => {
                console.log(error);
            })
        }
        getLogin()
    })

    const connection = useMemo(() =>
        ({ isConnected, setIsConnected }),
        [isConnected]
    )

    return (
        <BrowserRouter>
            <Auth.Provider value={connection}>
                <Body>
                    <Routes>

                        <Route path="/" element={<Accueil />} />
                        {(isConnected) ? (
                            <>
                                <Route path="/panier" element={<Panier />} />
                            </>
                        ) :
                            <>
                                <Route path="/connexion" element={<Connexion />} />
                                <Route path="/inscription" element={<Inscription />} />
                            </>
                        }
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </Body>
            </Auth.Provider>
        </BrowserRouter>
    )
}

export default Routeur