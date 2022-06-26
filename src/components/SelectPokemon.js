import { useEffect, useState } from "react";
import Select from "react-select";

const SelectPokemon = (props) => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
  const [pokemones, setPokemones] = useState([]);
  const [imgPokemon, setImgPokemon] = useState();
  const [name, setName] = useState();
  const [health, setHealth] = useState();
  async function fetchPokemonList() {
    try {
      const respuesta = await fetch(url, {
        method: "GET",
      });

      const pokemonesArr = await respuesta.json();
      setPokemones(pokemonesArr.results);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  let options = [];
  pokemones.map(function (pokemon) {
    try {
      options.push({ value: pokemon.url, label: pokemon.name });
    } catch (error) {
      console.log("ERROR: ", error);
    }
    return null;
  });

  async function fetchPokemon(urlP) {
    try {
      const respuestaPok = await fetch(urlP, {
        method: "GET",
      });

      const pokemon = await respuestaPok.json();
      console.log(pokemon);

      setHealth(pokemon.stats[0].base_stat);

      setName(pokemon.species.name);
      if (props.player === "1") {
        setImgPokemon(pokemon.sprites.back_default);
      } else {
        setImgPokemon(pokemon.sprites.front_default);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  const handleChange = (event) => {
    const url = event.value;

    fetchPokemon(url);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div>
      <Select options={options} onChange={handleChange}></Select>

      <div>
        <h2>{name}</h2>
        <img
          className="pokemon-image"
          src={imgPokemon}
          width="250px"
          height={"300px"}
        />
        <progress id="vida-pokemon1" value={health}></progress>
        <label htmlFor="vida-pokemon1" id="label-hp1"></label>
      </div>
    </div>
  );
};

export default SelectPokemon;
