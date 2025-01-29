import {PokemonClient} from 'pokenode-ts'

  export async function getPokemonId(id: number = 1) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`; 
    console.log(`Fetching data from: ${url}`); 
    const res = await fetch(url); 
  
    if (!res.ok) { 
      throw new Error(`Failed to fetch Pokemon ID: ${id}`);
    }
  
    const data = await res.json();
    console.log(data); 
  
    return data;
  }

  export async function getPokemonName(name: string = 'bulbasaur') {
    const api = new PokemonClient();
    const data = await api.getPokemonByName(name)
    return data
  }