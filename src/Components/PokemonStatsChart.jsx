import {BarChart, Bar, CartesianGrid, XAxis, YAxis} from 'recharts'
import {useState, useEffect} from 'react'

const PokemonStatsChart = ({stats, pokemon}) => {

    const [pokemonStats, updatePokemonState] = useState(null)

    useEffect(() => {
        const filterData = () => {
            let temp = []
            for(let key of stats)
            {
                temp.push(
                    {
                        type: key['stat']['name'],
                        stat: key['base_stat']
                    }
                )

            }
            updatePokemonState(temp)
        }
        filterData();
    }, [stats, pokemon])


    return (
        <div>
            <br />
            <h2> Stats for {pokemon} </h2>
            <div>
                {pokemonStats && <BarChart 
                    width ={1300}
                    height={400}
                    data={pokemonStats}
                >
                <CartesianGrid strokeDasharray = "5 5"/>
                <XAxis dataKey="type" />
                <YAxis/>
                <Bar dataKey="stat" fill="#8884d8"/>
                </BarChart>}
            </div>
        </div>
    );
}

export default PokemonStatsChart;