import React from "react";
import Pokecard from "../Pokecard/Pokecard.jsx";

function Pokedex(props) {
  const pokemonList = props.data.map((pokemon) => (
    <Pokecard key={pokemon.id} pokemon={pokemon} />
  ));

  return <div className="Pokedex">{pokemonList}</div>;
}

export default Pokedex;
