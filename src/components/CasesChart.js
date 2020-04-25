import React from 'react';
import { Tooltip, Area, Legend, CartesianGrid, XAxis, YAxis, ComposedChart } from 'recharts';

const CasesChart = (props) => {
    const { data } = props;
    const barMargin = { top: 5, right: 30, left: 20, bottom: 5 }

    return (<ComposedChart width={400} height={200} data={data} margin={barMargin}>
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="pink" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
            </linearGradient>
        </defs>
        <CartesianGrid stroke="#ccc" strokeDasharray="2 1" />
        <XAxis stroke="grey" padding={{ left: 5, right: 2 }} dataKey="date" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#DDD' }} labelStyle={{ color: '#FFF' }} />
        <Legend />
        <Area type="monotone" dataKey="cases" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="recovered" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        <Area type="monotone" dataKey="deaths" stroke="red" fillOpacity={1} fill="url(#colorDt)" />
    </ComposedChart>)
}

export default CasesChart;