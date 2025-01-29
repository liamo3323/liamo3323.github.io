"use client";
import React, { useEffect, useState } from "react";
import { getPokemonName } from "@components/Pk_api";

interface PokemonProps {
  pokemon: {
    sprite: string;
    name: string;
    Types: { type: { name: string } }[];
    Abilities: { ability: { name: string } }[];
    BaseStats: {
      HP: number;
      Attack: number;
      Defense: number;
      SpecialAttack: number;
      SpecialDefense: number;
      Speed: number;
    };
    Evolutions: string[];
    Moves: string[];
  } | null;
}

const Pk_display: React.FC<PokemonProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <p>No Pokémon selected.</p>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprite} alt={pokemon.name} width={150} />
      <p>Types: {pokemon.Types.map((t) => t.type.name).join(", ")}</p>
      <p>Abilities: {pokemon.Abilities.map((a) => a.ability.name).join(", ")}</p>
      <p>Base Stats:</p>
      <ul>
        <li>HP: {pokemon.BaseStats.HP}</li>
        <li>Attack: {pokemon.BaseStats.Attack}</li>
        <li>Defense: {pokemon.BaseStats.Defense}</li>
        <li>Special Attack: {pokemon.BaseStats.SpecialAttack}</li>
        <li>Special Defense: {pokemon.BaseStats.SpecialDefense}</li>
        <li>Speed: {pokemon.BaseStats.Speed}</li>
      </ul>
      <p>Evolutions: </p>
      <p>Moves: {pokemon.Moves.join(", ") || "None"}</p>
    </div>
  );
};

export default Pk_display;