"use client";
import React, { useEffect, useState } from "react";


async function fetchPokemonNames() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1303');
    const data = await res.json();
    return data.results.map((pokemon: { name: string }) => pokemon.name); // Return only the names
  }

  export default function Home() {
    const [search, setSearch] = useState('');
    const [pokemonList, setPokemonList] = useState<string[]>([]); 
    const [filteredList, setFilteredList] = useState<string[]>([]); 
  
    useEffect(() => {
      async function fetchData() {
        try {
          const names = await fetchPokemonNames(); 
          setPokemonList(names); 
          setFilteredList(names);
        } catch (error) {
          console.error("Error fetching Pokémon names:", error);
        }
      }
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const filtered = pokemonList.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase()) 
      );
      setFilteredList(filtered); 
    }, [search, pokemonList]); 
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state as user types
        />
        
        {search && (
          <div>
            <ul>
              {filteredList.map((pokemon, index) => (
                <li key={index}>{pokemon}</li> // Display filtered Pokémon names
              ))}
            </ul>
          </div>
        )}
  
        {/* Show all Pokémon names when no search input */}
        {!search && (
          <div>
            <ul>
              {pokemonList.map((pokemon, index) => (
                <li key={index}>{pokemon}</li> // Display all Pokémon names
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }