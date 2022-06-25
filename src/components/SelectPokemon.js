import { useEffect, useState } from "react";
import Select from "react-select";

const SelectPokemon = () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
  const [pokemones, setPokemones] = useState([]);
  const [urlPokemon, setUrlPokemon] = useState();
  const [imgPokemon, setImgPokemon] = useState(); 

  async function fetchPokemonList() {
    try {
      const respuesta = await fetch(url, {
        method: "GET",
      });

      const pokemonesArr = await respuesta.json();
      setPokemones(pokemonesArr.results);

      //console.log(pokemonesArr.results);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  let options = [];
  pokemones.map(function (pokemon) {
    try {
      //console.log(pokemon);
      options.push({ value: pokemon.url, label: pokemon.name });
    } catch (error) {
      console.log("ERROR: ", error);
    }
    return null;
  });

  async function fetchPokemon() {
    try {
      console.log(urlPokemon);
      const respuestaPok = await fetch(urlPokemon, {
        method: "GET",
      });

      const pokemon = await respuestaPok.json();

      console.log(pokemon.sprites.back_default);

      console.log(pokemon);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  const handleChange = (event) => {
    const url = event.value;

    setUrlPokemon(url);

    fetchPokemon();

    //get the selected pokemon
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div>
      <Select options={options} onChange={handleChange}></Select>

      <div>
          <img src={imgPokemon} width="200px" height={"300px"}/>
          </div>
    </div>
  );
};

export default SelectPokemon;
