import React from "react";

export default function Pokecard(props) {
  const { name, type, image, moves } = props.pokemon;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="Pokecard">
      <h2>{capitalizeFirstLetter(name)}</h2>
      <img src={image} alt={name} />
      <p>Type: {capitalizeFirstLetter(type)}</p>
      <p>Moves:</p>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>{capitalizeFirstLetter(move)}</li>
        ))}
      </ul>
    </div>
  );
}
