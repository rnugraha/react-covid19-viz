import React from 'react';
import { Tooltip, Line, Legend, CartesianGrid, XAxis, YAxis, ComposedChart, ResponsiveContainer } from 'recharts';

const NewCasesChart = (props) => {
    const { data } = props;
    const barMargin = { top: 5, right: 5, left: 5, bottom: 5 }

    return (<ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
        <ComposedChart width={400} height={250} data={data} margin={barMargin}>
            <CartesianGrid stroke="#ccc" strokeDasharray="2 1" />
            <XAxis stroke="grey" padding={{ left: 5, right: 2 }} dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#FEFEFE' }} labelStyle={{ color: '#666' }} />
            <Legend />
            <Line dataKey="newCases" stroke="#8884d8" fill="#888999" dot={false} />
            <Line dataKey="newDeaths" stroke="red" fill="pink" dot={false} />
        </ComposedChart>
    </ResponsiveContainer>);
}

export default NewCasesChart;