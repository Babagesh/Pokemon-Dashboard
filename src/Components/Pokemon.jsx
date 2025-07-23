import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import PokemonStatsChart from './PokemonStatsChart'
import PokemonTypesChart from './PokemonTypesChart.jsx'

const Pokemon = () => {
    const {pokemon} = useParams();

    const[pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        const getPokemonDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            const json = await response.json();
            console.log(json)
            setPokemonDetails({
                name: pokemon, // string
                moves: json['moves'], // array
                stats: json['stats'], //array
                abilities: json['abilities'], // array
                image: json['sprites']['front_default'], //string
                types: json['types'] //array
            })
        }
        getPokemonDetails().catch(console.error)
    }, [pokemon])

    return (
        <div className = 'pokemon'>
        {
            pokemonDetails && 
            (<div> 
                <img src={pokemonDetails['image']} />
                <h1>{pokemon}</h1>
                <h2> Abilities: </h2>
                <ul> {
                pokemonDetails['abilities'].map((ability,index) => 
                <li key = {index}> 
                    {ability['ability']['name']} 
                </li>)
                } </ul>
                <br />
                <h2> Moves: </h2>
                <ul> {
                    pokemonDetails['moves'].slice(0,5).map((move,index) => 
                        <li key={index}> 
                            {move['move']['name']}
                        </li>)
                }</ul>
                <PokemonStatsChart 
                    stats = {pokemonDetails['stats']}
                    pokemon = {pokemon}
                />
                <PokemonTypesChart 
                    types = {pokemonDetails['types']}
                    pokemon = {pokemon}
                />

            </div>)
        }
        </div>
    );
}

export default Pokemon;