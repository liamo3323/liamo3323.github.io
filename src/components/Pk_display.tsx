"use client";
import React, { useEffect, useState } from "react";
import { getPokemonName } from "@components/Pk_api";

interface PokemonProps {
  pokemon: {
    sprite: string | undefined;
    name: string;
    Types: string[];
    Abilities: string[];
    BaseStats: {
      HP: number;
      Attack: number;
      Defense: number;
      SpecialAttack: number;
      SpecialDefense: number;
      Speed: number;
    };
    Evolutions: Map<string, any>;
    Moves: {
      moveName: string;
      levelLearnedAt: number;
      moveUrl: string;
    }[];
  } | null;
}

interface Moves {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    move_learn_method: {
      name: string;
    };
    version_group: {
      name: string;
    };
    level_learned_at: number;
  }[];
}

const Pk_display: React.FC<PokemonProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <p>No Pokémon selected.</p>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprite} alt={pokemon.name} width={150} />
      <p>Types: {pokemon.Types.join(", ")}</p>  {/* Directly join strings */}
      <p>Abilities: {pokemon.Abilities.join(", ")}</p>  {/* Directly join strings */}
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