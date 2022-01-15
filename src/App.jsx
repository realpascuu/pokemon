import React, { Fragment, useState, useRef } from 'react'
import { PokemonCard } from './components/PokemonCard'
import { llamadaDatosPokemon } from './services/clienteApi'

export function App() {
    const [ pokemon, setPokemon ] = useState()

    const [ errorMessage, setErrorMessage ] = useState()

    const searchRef = useRef()

    const handleCleanSearch = () => {
        searchRef.current.value = ''
        setPokemon();
        setErrorMessage();
    }

    const handleSearchClick = async () => {
        console.log(searchRef.current.value.toLocaleLowerCase())
        const newSearch = await llamadaDatosPokemon(searchRef.current.value.toLocaleLowerCase())

        console.log(newSearch)
        if(newSearch.message){
            setErrorMessage(newSearch.message)
            setPokemon()
        } else {
            setPokemon({
                id: newSearch?.id,
                name: newSearch?.name,
                types: newSearch?.types,
                urlImage: newSearch?.sprites?.front_default
            })
        }
    }

    return (
        <Fragment>
            <input ref={searchRef} placeholder='Nombre o número pokedex' type="text"></input>
            <button onClick={handleSearchClick}>Buscar</button>
            <button onClick={handleCleanSearch}>Limpiar Búsqueda</button>
            {pokemon ? <PokemonCard {...pokemon}></PokemonCard> :
            <div>¡Busca tu Pokemon favorito!</div>}
            {errorMessage ? <div>{errorMessage}</div> : <Fragment></Fragment>}
        </Fragment>
    )
}