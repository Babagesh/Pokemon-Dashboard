import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import PokemonStatsChart from './PokemonStatsChart'
import PokemonTypesChart from './PokemonTypesChart.jsx'

const Pokemon = () => {
    const {pokemon} = useParams();
    const[pokemonDetails, setPokemonDetails] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const getPokemonDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                const json = await response.json();
                console.log(json)
                setPokemonDetails({
                    name: pokemon,
                    moves: json['moves'],
                    stats: json['stats'],
                    abilities: json['abilities'],
                    image: json['sprites']['front_default'],
                    types: json['types']
                });
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            }
            setLoading(false);
        }
        getPokemonDetails();
    }, [pokemon])

    if (loading) {
        return <div className="loading">Loading Pokemon data...</div>;
    }

    if (!pokemonDetails) {
        return <div className="error">Pokemon not found!</div>;
    }

    return (
        <div className="pokemon">
            <div className="pokemon-header">
                <img 
                    src={pokemonDetails.image} 
                    alt={pokemon}
                    className="pokemon-image"
                />
                <h1 className="pokemon-name">{pokemon}</h1>
            </div>

            <div className="pokemon-content">
                <div className="pokemon-section">
                    <h2>Abilities</h2>
                    <ul className="pokemon-list">
                        {pokemonDetails.abilities.map((ability, index) => 
                            <li key={index}>
                                {ability.ability.name}
                            </li>
                        )}
                    </ul>
                </div>

                <div className="pokemon-section">
                    <h2>Top 5 Moves</h2>
                    <ul className="pokemon-list">
                        {pokemonDetails.moves.slice(0, 5).map((move, index) => 
                            <li key={index}>
                                {move.move.name}
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="chart-container">
                <h3 className="chart-title">Base Stats</h3>
                <PokemonStatsChart 
                    stats={pokemonDetails.stats}
                    pokemon={pokemon}
                />
            </div>

            <div className="chart-container">
                <h3 className="chart-title">Types</h3>
                <PokemonTypesChart 
                    types={pokemonDetails.types}
                    pokemon={pokemon}
                />
            </div>
        </div>
    );
}

export default Pokemon;