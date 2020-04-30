import React from 'react';
import { Tooltip, Bar, Legend, CartesianGrid, XAxis, YAxis, Brush, BarChart, ResponsiveContainer } from 'recharts';

const NewCasesChart = (props) => {
    const { data, options } = props;
    const barMargin = { top: 5, right: 5, left: 5, bottom: 5 }

    return (<ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
        <BarChart width={400} height={250} data={data} margin={barMargin}>
            <CartesianGrid stroke="#ccc" strokeDasharray="2 1" />
            <XAxis stroke="grey" padding={{ left: 5, right: 2 }} dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#FEFEFE' }} labelStyle={{ color: '#666' }} />
            <Legend verticalAlign="top" height={36} />
            <Brush dataKey="date" height={30} stroke="#8884d8" />
            {options.newCases ? <Bar dataKey="newCases" fill="#3f51b5" dot={false} /> : ''}
            {options.newDeaths ? <Bar dataKey="newDeaths" stroke="red" fill="red" dot={false} /> : ''}
        </BarChart>
    </ResponsiveContainer>);
}

export default NewCasesChart;