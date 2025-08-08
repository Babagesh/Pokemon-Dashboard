import './App.css'
import {useEffect, useState} from 'react'
import Dashboard from './Components/Dashboard'

export default function App()
{

  const [pokemon, updatePokemon] = useState([])

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const json = await response.json();
      const pokemonList = json.results;
      const infoList = [];
      for(let pokemon of pokemonList)
      {
        const pokemonName = pokemon['name']
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const pokemonInfo = await pokemonResponse.json();
        infoList.push(pokemonInfo);
      }
      updatePokemon(infoList)
  }
    getPokemon().catch(console.error)
}, [])
  return (
      <div className = "main">
        <Dashboard 
          pokemons = {pokemon}
        />
      </div>
  );
}