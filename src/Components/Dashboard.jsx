import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const Dashboard = ({pokemons}) => {
    const [search, updateSearch] = useState("");
    const [filter, updateFilter] = useState("")
    const [filteredPokemon, setFilteredPokemon] = useState(pokemons)
    const [statistics, updateStatistics] = useState({
        Count: 0,
        Height: 0,
        Weight: 0
    });

    useEffect(() => {
        let pokemonFilter = pokemons;
        if(filter !== "") {
            pokemonFilter = pokemons.filter((pokemon) => {
                const types = pokemon['types']
                let flag = false;
                for(let type of types) {
                    if(type['type']['name'] === filter) {
                        flag = true;
                    }
                }
                return flag;
            })   
        }
        if(search !== "") {
            pokemonFilter = pokemonFilter.filter((pokemon) => {
                const name = pokemon['name']
                return name.toLowerCase().includes(search)
            })
        }
        setFilteredPokemon(pokemonFilter)
        
        const count = pokemonFilter.length;
        if (count > 0) {
            const totalHeight = pokemonFilter.reduce((sum, p) => sum + p.height, 0);
            const totalWeight = pokemonFilter.reduce((sum, p) => sum + p.weight, 0);
            updateStatistics({
                Count: count,
                Height: Math.round(totalHeight / count),
                Weight: Math.round(totalWeight / count)
            });
        } else {
            updateStatistics({ Count: 0, Height: 0, Weight: 0 });
        }
    }, [search, filter, pokemons])

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Pokemon Dashboard</h1>
                <p>Explore Pokemon with search and filtering</p>
            </div>

            <div className="statistics">
                <div className="statistic">
                    <div className="stat-number">{statistics.Count}</div>
                    <div className="stat-label">Pokemon Count</div>
                </div>
                <div className="statistic">
                    <div className="stat-number">{statistics.Height}</div>
                    <div className="stat-label">Average Height</div>
                </div>
                <div className="statistic">
                    <div className="stat-number">{statistics.Weight}</div>
                    <div className="stat-label">Average Weight</div>
                </div>
            </div>

            <div className="inputs">
                <input 
                    type="text"
                    placeholder="Enter pokemon name"
                    onChange={(e) => updateSearch(e.target.value)}
                    className="search-input"
                />
                <label className="filter-label">
                    <span>Pick a type:</span>
                    <select name="pokemonType" onChange={(e) => updateFilter(e.target.value)} className="filter-select">
                        <option value="">All Types</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                        <option value="normal">Normal</option>
                    </select>
                </label>
            </div>

            <div className="pokemon-grid">
                {filteredPokemon.map((pokemon) => 
                    <div key={pokemon.id} className="pokemon-card">
                        <Link to={`/pokemonPage/${pokemon['name']}`} className="pokemon-link">
                            <img src={pokemon['sprites']['front_default']} alt={pokemon.name} className="pokemon-image"/>
                            <div className="pokemon-info">
                                <h3 className="pokemon-name">{pokemon['name']}</h3>
                                <div className="pokemon-stats">
                                    <span>Weight: {pokemon['weight']}</span>
                                    <span>Height: {pokemon['height']}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;