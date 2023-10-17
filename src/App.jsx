import React, { useState, useEffect } from "react";
import "./App.css";
import { Pokedex } from "./components";

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedPokemonData = [
    {
      id: 1,
      name: "Charmander",
      type: "fire",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      moves: ["Ember","Scratch", "Growl"],
    },
    {
      id: 2,
      name: "Squirtle",
      type: "water",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      moves: ["Water Gun","Tackle","Tail Whip" ],
    },
    {
      id: 3,
      name: "Butterfree",
      type: "flying",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
      moves: ["Confusion","Gust","Sleep Powder"],
    },
    {
      id: 4,
      name: "Rattata",
      type: "normal",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
      moves: ["Tackle" ,"Quick Attack", "Tail Whip"],
    },
    {
      id: 5,
      name: "Metapod",
      type: "bug",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
      moves: ["Harden","String Shot","Tackle" ],
    },
  ];

  const [mergedPokemonData, setMergedPokemonData] = useState([...predefinedPokemonData]);

  useEffect(() => {
    if (pokemonName === "") {
      setPokemonData(null);
      return;
    }

    setIsLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon not found!");
        }
        return response.json();
      })
      .then((data) => {
        setPokemonData({
          ...data,
        });
        setIsLoading(false);

        // Add the new Pokemon data to mergedPokemonData without overwriting the existing data.
        setMergedPokemonData((prevData) => [
          ...prevData,
          {
            id: data.id,
            name: data.name,
            type: data.types[0].type.name,
            image: data.sprites.front_default,
            moves: [
              data.moves[0].move.name,
              data.moves[1].move.name,
              data.moves[2].move.name,
            ],
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
        setPokemonData(null);
        setIsLoading(false);
      });
  }, [pokemonName]);

  const handlePokemonSubmit = (e) => {
    e.preventDefault();
    setPokemonData(null);
    setPokemonName(e.target.pokemonName.value);
  };

  return (
    <div className="App">
      <h1>Pokemon App</h1>
      <form className="pokemon-form" onSubmit={handlePokemonSubmit}>
        <input
          type="text"
          name="pokemonName"
          placeholder="Enter a Pokemon Name"
        />
        <button type="submit">Submit</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {pokemonData ? (
        <div>
          <p>Pokemon added to Pokedex!</p>
        </div>
      ) : (
        <p>No Pokemon yet, please submit a Pokemon!</p>
      )}
      <h1>Pokedex</h1>
      <Pokedex data={mergedPokemonData} />
    </div>
  );
}
