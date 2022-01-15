import React from 'react'
import ReactDOM from 'react-dom'
import { StrictMode } from 'react/cjs/react.production.min'
import { Auth0Provider } from '@auth0/auth0-react'
import { App } from './App'

document.title = 'Pokemon Info'

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

export const publicURL = process.env.PUBLIC_URL;

ReactDOM.render(
    <StrictMode>
        <Auth0Provider domain={domain}
        clientId={clientId}
        redirectUri={`${window.location.origin}${publicURL}`}>
            <App />
        </Auth0Provider>
    </StrictMode>, 
    document.getElementById('root')
);