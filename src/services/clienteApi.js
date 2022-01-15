const LLAMADA_API = 'https://pokeapi.co/api/v2/pokemon'

export async function llamadaDatosPokemon(busqueda) {
    return await fetch(`${LLAMADA_API}/${busqueda}`)
        .then(async(result) => {
            return await result.json()
        }).catch((error) => {
            return { message: `¡El Pokemon ${busqueda} no existe!` }
        })
}