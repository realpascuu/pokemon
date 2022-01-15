import React from 'react'
import { useAuth0 } from '@auth0/auth0-react' 
import '../styles/Profile.css'


export function Profile() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    if (isLoading)
        return <div>Loading...</div>
    
    return (
        isAuthenticated && (
            <div>
                <img className={'imgRedonda'} src={user.picture} alt={user.name}></img>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )
    )
}
