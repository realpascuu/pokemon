import React from 'react'
import {containerPoke, containerTypes, imgPokeStyle, tituloStyle, imgTypeStyle } from '../styles/PokemonCard'

export function PokemonCard({ id, urlImage, name, types }) {
    const obtenerImg = (type) => {
        if(window.location.href.endsWith('/'))
            return `${window.location.href}assets/types/${type}.png`
        else 
        return `${window.location.href}/assets/types/${type}.png`
    }

    return (
        <div style={containerPoke}>
            <h2 style={tituloStyle}>{name}</h2>
            <img style={imgPokeStyle} src={urlImage} alt={name}></img>
            <div style={containerTypes}>
            {
                types.map((element) => <img style={imgTypeStyle} key={element.type.name} src={obtenerImg(element.type.name)} alt={`${element.type.name} `}></img>)
            }
            </div>
        </div>
    )
}
