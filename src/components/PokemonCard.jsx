import React from 'react'
import  '../styles/PokemonCard.css'

export function PokemonCard({ id, name, types, urlImage }) {
    const obtenerImg = (type) => {
        return `${window.origin}/pokemon/assets/types/${type}.png`
    }

    return (
        <div className={'containerPoke'}>
            <h2 className={'tituloStyle'}>{name}</h2>
            <h2 className='tituloStyle'>{id}</h2>
            <img className={'imgPokeStyle'} src={urlImage} alt={name}></img>
            <div className={'containerTypes'}>
            {
                types.map((element) => <img className={'imgTypeStyle'} key={element.type.name} src={obtenerImg(element.type.name)} alt={`${element.type.name} `}></img>)
            }
            </div>
        </div>
    )
}
