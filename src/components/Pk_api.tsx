import {PokemonClient, EvolutionClient} from 'pokenode-ts'
const evoapi = new EvolutionClient();
const pokiapi = new PokemonClient();

interface EvolutionDetails {
  trigger: { name: string };
  item?: { name: string } | null; 
  min_level?: number | null;
  time_of_day?: string | null;
  known_move?: { name: string } | null;
  known_move_type?: { name: string } | null;
  location?: { name: string } | null;
  held_item?: { name: string } | null;
  min_happiness?: number | null;
  min_beauty?: number | null;
  min_affection?: number | null;
  gender?: number | null;
  relative_physical_stats?: number | null;
  needs_overworld_rain?: boolean | null;
  turn_upside_down?: boolean | null;
}

interface EvolutionChain {
  species: { name: string };
  evolves_to: EvolutionChain[];
  evolution_details: EvolutionDetails[];
}

  export async function getPokemonId(id: number = 1) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`; 
    // console.log(`Fetching data from: ${url}`); 
    const res = await fetch(url); 
  
    if (!res.ok) { 
      throw new Error(`Failed to fetch Pokemon ID: ${id}`);
    }
  
    const data = await res.json();
    // console.log(data); 
  
    return data;
  }

  export async function getPokemonName(name: string = 'bulbasaur') {
    const data = await pokiapi.getPokemonByName(name)
    return data
  }

  export async function getPokemonEvolutions(name: string = 'bulbasaur') {
    const pkmnSpecies = await pokiapi.getPokemonSpeciesByName(name)
    const idMatch = pkmnSpecies.evolution_chain.url.match(/evolution-chain\/(\d+)/)
    const evolutionChainId = idMatch ? Number(idMatch[1]) : null;

    if (!evolutionChainId) {
      throw new Error(`Failed to find evolution chain ID for ${name}`);
    }
    const evolution = await evoapi.getEvolutionChainById(evolutionChainId)

    const evolutionMap = new Map<string, any>();

    const traverseEvolutions = (chain: EvolutionChain) => {
      const speciesName = chain.species.name;
      const evolvesTo = chain.evolves_to;

      if (evolvesTo.length > 0) {
      evolvesTo.forEach((evolution) => {
        const evolutionDetails = evolution.evolution_details[0];
        const condition = {
        trigger: evolutionDetails.trigger.name,
        item: evolutionDetails.item?.name || null,
        minLevel: evolutionDetails.min_level || null,
        timeOfDay: evolutionDetails.time_of_day || null,
        knownMove: evolutionDetails.known_move?.name || null,
        knownMoveType: evolutionDetails.known_move_type?.name || null,
        location: evolutionDetails.location?.name || null,
        heldItem: evolutionDetails.held_item?.name || null,
        happiness: evolutionDetails.min_happiness || null,
        beauty: evolutionDetails.min_beauty || null,
        affection: evolutionDetails.min_affection || null,
        gender: evolutionDetails.gender || null,
        relativePhysicalStats: evolutionDetails.relative_physical_stats || null,
        needsOverworldRain: evolutionDetails.needs_overworld_rain || null,
        turnUpsideDown: evolutionDetails.turn_upside_down || null,
        };

        evolutionMap.set(speciesName, condition);
        traverseEvolutions(evolution);
      });
      } else {
      evolutionMap.set(speciesName, null);
      }
    };

    traverseEvolutions(evolution.chain);
    console.log(evolutionMap)
    return evolutionMap
  }

  export async function getPokemonLevelUpMoves(name: string = 'bulbasaur') {
    const pkmn = await pokiapi.getPokemonByName(name)
    
    const moves = pkmn.moves.filter((move) => 
      move.version_group_details.some((detail) => detail.move_learn_method.name === 'level-up' && detail.version_group.name === 'scarlet-violet')
    )
    
      const levelUpMoves = moves.map((move) => {
        const levelUpDetail = move.version_group_details.find(
          (detail) => detail.move_learn_method.name === 'level-up' && detail.version_group.name === 'scarlet-violet'
        );

        if (!levelUpDetail) {
          return null;
        }

        const moveName = move.move.name;
        const levelLearnedAt = levelUpDetail.level_learned_at;
        const moveUrl = move.move.url;

        return { moveName, levelLearnedAt, moveUrl };
      }).filter((move): move is { moveName: string; levelLearnedAt: number; moveUrl: string } => move !== null);


    levelUpMoves.sort((a, b) => a.levelLearnedAt - b.levelLearnedAt);
    return levelUpMoves
  }

  export async function getPokemonAbility(name: string = 'bulbasaur') {
    const pkmn = await pokiapi.getPokemonByName(name)
    const abilities = pkmn.abilities.map((ability) => ability.ability.name)
    return abilities
  }

  export async function fetchPokemonDetails(name: string = 'bulbasaur') {
    
    const pkmn = await pokiapi.getPokemonByName(name)

    const jsonPkmn = {
      sprite: pkmn.sprites.other?.['official-artwork'].front_default || 'default_sprice_png',
      name: pkmn.name,
      Types: pkmn.types.map((type) => type.type.name),
      Abilities: await getPokemonAbility(name),
      BaseStats: {
        HP: pkmn.stats[0].base_stat,
        Attack: pkmn.stats[1].base_stat,
        Defense: pkmn.stats[2].base_stat,
        SpecialAttack: pkmn.stats[3].base_stat,
        SpecialDefense: pkmn.stats[4].base_stat,
        Speed: pkmn.stats[5].base_stat
      },
      Evolutions: await getPokemonEvolutions(name),
      Moves: await getPokemonLevelUpMoves(name)
    };
    console.log(jsonPkmn)
    return jsonPkmn
  }