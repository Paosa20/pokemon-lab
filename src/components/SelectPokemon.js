import { useEffect, useState } from "react";
import Select from "react-select";

const SelectPokemon = (props) => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
  const [pokemones, setPokemones] = useState([]);
  const [imgPokemon, setImgPokemon] = useState();
  const [name, setName] = useState();
  const [health, setHealth] = useState(0);
  const [maxHealth, setMaxHealth] = useState(0);
  const [ataques, setAtaques] = useState();
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
      setMaxHealth(pokemon.stats[0].base_stat);

      // console.log(pokemon.stats[0].base_stat);

      setName(pokemon.species.name);
      await fetchAtaques(pokemon);
      if (props.player === "1") {
        setImgPokemon(pokemon.sprites.back_default);
      } else {
        setImgPokemon(pokemon.sprites.front_default);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  const handleChange = async (event) => {
    const url = event.value;

    fetchPokemon(url);
  };

  async function fetchAtaques(pokemon) {
    try {
      const movesPokemon = [];
      for (let i = 0; i < 4; i++) {
        const indice = Math.floor(Math.random() * pokemon.moves.length);
        movesPokemon.push(pokemon.moves[indice]);
      }

      const promesas = movesPokemon.map((ataque) => {
        return fetch(ataque.move.url);
      });

      const respuestas = await Promise.all(promesas);

      const ataques = await Promise.all(
        respuestas.map(function (respuesta) {
          return respuesta.json();
        })
      );

      setAtaques(ataques);

      let receptorDano;

      if (props.player === "1") {
        receptorDano = "pokemon1";
      } else {
        receptorDano = "pokemon2";
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

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
        <progress id="vida-pokemon1" value={health} max={maxHealth}></progress>
        <label htmlFor="vida-pokemon1" id="label-hp1">
          {health + "/" + maxHealth}
        </label>
      </div>

      <div>


          {ataques !== undefined && 
           ataques.map(function (a) {
            return (
              <div key={a.name}>
                  
                <button key={a.name} className="boton-ataque"> {a.name}</button>
              </div>
            );
          })}
       
      </div>
    </div>
  );
};

//map the attacks and create the buttons with thr attack names and values

export default SelectPokemon;
