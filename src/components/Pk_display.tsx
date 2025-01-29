"use client";
import React, { useEffect, useState } from "react";
import { getPokemonName } from "@components/Pk_api";

const Pk_details = () => {
  const [posts, setPosts] = useState<any[]>([]); // ✅ Store fetched Pokémon data

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPokemonName(); // ✅ Fetch Pokémon with ID 1
        setPosts([data]); // ✅ Store the Pokémon data in an array
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>Name: {post.name}</p>
            <p>Type: {post.types[0].type.name}</p>
            <p>Ability: {post.abilities[0].ability.name}</p>
            <p>Base Stat: {post.stats[0].base_stat}</p>
            <p>Evolution: idk</p>
            <p>Moves?</p>
          </div>
        ))
      ) : (
        <p>Loading...</p> // ✅ Show loading message while fetching data
      )}
    </div>
  );
};

export default Pk_details;
