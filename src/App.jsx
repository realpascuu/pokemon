import React, { Fragment, useState, useRef } from 'react'
import { PokemonCard } from './components/PokemonCard'
import { llamadaDatosPokemon } from './services/clienteApi'
import './styles/App.css'

export function App() {
    const [ pokemon, setPokemon ] = useState()

    const [ errorMessage, setErrorMessage ] = useState()

    const [ shiny, setShiny ] = useState(false)

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
            if(!pokemon || pokemon.id !== newSearch.id){
                const newPokemon = {
                    id: newSearch?.id,
                    name: newSearch?.name,
                    types: newSearch?.types,
                    urlImageDefault: newSearch?.sprites?.front_default,
                    urlImageShiny: newSearch?.sprites?.front_shiny
                }
                setPokemon(newPokemon)
            }
            if(errorMessage)
                setErrorMessage()
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter')
            handleSearchClick()
    }

    const handleChangeShiny = () => {
        setShiny(!shiny)
    }

    return (
        <Fragment>
            <h1 className={'titulo'}>Pokédex</h1>
            <div className={'centrarContenido'}>
                <input onKeyPress={handleKeyPress} ref={searchRef} placeholder='Nombre o número pokédex' type="text"></input>
            </div>
            <div className={'centrarContenido'}>
                <button className={'boton botonDefault'} onClick={handleCleanSearch}>Limpiar</button>
                <button className={'boton botonDefault'} onClick={handleSearchClick}>Buscar</button>
                <button className={shiny ? 'boton botonShiny' : 'boton botonDefault'} onClick={handleChangeShiny}>Shiny</button>
            </div>
            <div className={'centrarContenido'}>
                {pokemon ? <PokemonCard {...pokemon} urlImage={shiny ? pokemon.urlImageShiny : pokemon.urlImageDefault}></PokemonCard> : 
                errorMessage ? 
                <div className={'divAlerta error'}>{errorMessage}</div> : 
                <div className={'divAlerta info'}>¡Empieza a buscar tu Pokemon favorito!</div>}
            </div>
        </Fragment>
    )
}