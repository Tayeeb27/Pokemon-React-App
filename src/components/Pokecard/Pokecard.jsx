import React from "react";

export default function Pokecard(props) {
  const { name, type, image } = props.pokemon;

  return (
    <div className="Pokecard">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>Type: {type}</p>
    </div>
  );
}


