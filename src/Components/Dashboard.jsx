import {useState, useEffect} from 'react'
const Dashboard = ({pokemons}) => {

    const [search, updateSearch] = useState("");
    
    const [filter, updateFilter] = useState("")

    const [filteredPokemon, setFilteredPokemon] = useState(pokemons)

    const [statistics, updateStatistics] = useState({
        Count: 0,
        Height:0,
        Weight:0
    });

    useEffect(() => {
            let pokemonFilter = pokemons;
            if(filter !== "")
            {
                pokemonFilter = pokemons.filter(
                (pokemon) => {
                    const types = pokemon['types']
                    let flag = false;
                    for(let type of types)
                    {
                        if(type['type']['name'] == filter)
                        {
                            flag = true;
                        }
                    }
                    return flag;
                    }
                )   
            }
            if(search !== "")
            {
                    pokemonFilter = pokemonFilter.filter(
                        (pokemon) => {
                            const name = pokemon['name']
                            return name.toLowerCase().includes(search)
                        }
                    )
            }
            setFilteredPokemon(pokemonFilter)
            
            // --- START: NEW CODE TO ADD ---
            // This calculates the statistics based on the filtered list
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
            },[search, filter, pokemons])
    return (
        <div className = "dashboard">
            <div className = "statistics">
                <div className = "statistic">
                    <p> {statistics.Count} </p>
                    <h1> Pokemon Count </h1>
                </div>
                <div className = "statistic">
                    <p> {statistics.Height} </p>
                    <h1> Average Height </h1>
                </div>
                <div className = "statistic">
                    <p> {statistics.Weight} </p>
                    <h1> Average Weight </h1>
                </div>
            </div>
            {/* --- END: NEW CODE TO ADD --- */}

            <div className = "inputs">
                <input 
                type = "text"
                placeholder = "Enter pokemon"
                onChange={
                    (e) => updateSearch(e.target.value)
                }
                />
                <label>
                <p> Pick a type of pokemon: </p>
                    <select name = "pokemonType" onChange={(e) => {
                        updateFilter(e.target.value)
                    }}>
                        <option value=""></option>
                        <option value="fire">fire</option>
                        <option value="water">water</option>
                        <option value="grass">grass</option>
                    </select>
                </label>
                
            </div>
            <div className = "attributes">
                <p> Name </p>
                <p> Weight</p>
                <p> Height</p>
                <p> Image</p>
            </div>
            <div className="output">
                <ul>
                {
                    filteredPokemon.map(
                        (pokemon) => 
                            <li key={pokemon.id}>
                                <p>{pokemon['name']}</p>
                                <p>{pokemon['weight']}</p>
                                <p>{pokemon['height']}</p>
                                <img src={pokemon['sprites']['front_default']}/>
                            </li>
                    )
                }
                </ul>
            </div>
            
        </div>
    );
}

export default Dashboard;