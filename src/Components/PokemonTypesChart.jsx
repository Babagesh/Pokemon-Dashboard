import {PieChart, Pie, Cell} from 'recharts'
import {useState, useEffect} from 'react'

const PokemonTypesChart = ({types, pokemon}) => {

    const [pokemonData, updatePokemonData] = useState(null)

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];


    useEffect(() => {
        const filterData = () => {
            const length = types.length;
            updatePokemonData(
                types.map(key => ({
                    name: key['type']['name'],
                    value: Math.floor(100 / length)
                })
                )
           )
        }
        filterData();
    },[types, pokemon])

    return (
    <div>
        <br/>
        <h2> Type breakup for {pokemon}</h2>
        <div>
            {
                pokemonData && 
                <PieChart
                    width={1300}
                    height={400}
                >
                <Pie 
                    data={pokemonData}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    dataKey='value'
                    label={({name, value}) => `${name}: ${value}%`}
                >
                {pokemonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}      
                </Pie>
                </PieChart>
            }
        </div>
       
    </div>
    );
}

export default PokemonTypesChart;