import React from 'react';
import { Tooltip, Line, Legend, CartesianGrid, XAxis, YAxis, ComposedChart } from 'recharts';

const NewCasesChart = (props) => {
    const { data } = props;
    const barMargin = { top: 5, right: 30, left: 20, bottom: 5 }

    return (<ComposedChart width={400} height={200} data={data} margin={barMargin}>
        <CartesianGrid stroke="#ccc" strokeDasharray="2 1" />
        <XAxis stroke="grey" padding={{ left: 5, right: 2 }} dataKey="date" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#DDD' }} labelStyle={{ color: '#FFF' }} />
        <Legend />
        <Line dataKey="newCases" stroke="#8884d8" fill="#888999"/>
        <Line dataKey="newDeaths" stroke="red" fill="pink"/>
    </ComposedChart>)
}

export default NewCasesChart;