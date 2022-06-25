import { useEffect, useState } from "react"
import Select from 'react-select'

const SelectPokemon = () => {

    const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
    const [pokemones, setPokemones] = useState([])

    async function fetchPokemon() {

        try {

            const respuesta = await fetch(url, {
                method: "GET"
            })

            const pokemonesArr = await respuesta.json()
            setPokemones(pokemonesArr.results)

            //console.log(pokemonesArr.results);

        } catch (error) {
            console.log("ERROR: ", error);
        }
    }

    let options = [];
    pokemones.map(function (pokemon) {

       

        try {
            console.log(pokemon);
            options.push({ value: pokemon.url, label: pokemon.name })
           
            
        } catch (error) {
            console.log("ERROR: ", error);
        }
        return null
       
    })

    //console.log(options);

    useEffect(() => {
        fetchPokemon()
    }, [])



    return (
        <div>
            <Select options={options}></Select>

            <div> </div>
        </div>
    )

}

export default SelectPokemon