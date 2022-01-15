import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import '../styles/App.css'

export function Logout() {
    const { logout } = useAuth0();
    return (
        <button className={'boton botonDefault'} onClick={logout}>Logout</button>
    )
}
