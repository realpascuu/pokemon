import React, { Fragment, useState, useRef } from 'react'
import { PokemonCard } from './components/PokemonCard'
import { llamadaDatosPokemon } from './services/clienteApi'
import './styles/App.css'

export function App() {
    const [ pokemon, setPokemon ] = useState()

    const [ errorMessage, setErrorMessage ] = useState()

    const searchRef = useRef()

    const handleCleanSearch = () => {
        if(searchRef.current.value.length > 0)
            searchRef.current.value = ''
        if(pokemon)
            setPokemon();
        if(errorMessage)
            setErrorMessage();
    }

    const handleSearchClick = async () => {
        // comprobar que el input está vacío, NO HACE NADA
        if(searchRef.current.value.length === 0) return

        const newSearch = await llamadaDatosPokemon(searchRef.current.value.toLocaleLowerCase())

        searchRef.current.value = ''
        
        if(newSearch.message){
            setErrorMessage(newSearch.message)
            if(pokemon)
                setPokemon()
        } else {
            if(!pokemon || pokemon.id !== newSearch.id)
                setPokemon({
                    id: newSearch?.id,
                    name: newSearch?.name,
                    types: newSearch?.types,
                    urlImage: newSearch?.sprites?.front_default
                })
            if(errorMessage)
                setErrorMessage()
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter')
            handleSearchClick()
    }

    return (
        <Fragment>
            <h1 className={'titulo'}>Pokédex</h1>
            <div className={'centrarContenido'}>
                <input onKeyPress={handleKeyPress} ref={searchRef} placeholder='Nombre o número pokédex' type="text"></input>
            </div>
            <div className={'centrarContenido'}>
                <button className={'boton'} onClick={handleSearchClick}>Buscar</button>
                <button className={'boton'} onClick={handleCleanSearch}>Limpiar</button>
            </div>
            <div className={'centrarContenido'}>
                {pokemon ? <PokemonCard {...pokemon}></PokemonCard> : 
                errorMessage ? 
                <div className={'divAlerta error'}>{errorMessage}</div> : 
                <div className={'divAlerta info'}>¡Empieza a buscar tu Pokemon favorito!</div>}
            </div>
        </Fragment>
    )
}