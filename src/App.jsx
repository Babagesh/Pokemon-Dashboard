import './App.css'
import {useEffect, useState} from 'react'
import Dashboard from './Components/Dashboard'

export default function App()
{

  const [pokemon, updatePokemon] = useState([])

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
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
    <div className = "App">
      <div className = "navigation-sidebar">
        <h1> Pokedata</h1>
        <p> Dashboard </p>
        <p> Search</p>
        <p> About</p>
      </div>
      <div className = "main">
        <Dashboard 
          pokemons = {pokemon}
        />
      </div>
    </div>
  );
}