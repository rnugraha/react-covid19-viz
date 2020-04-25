import React, {useEffect, useState} from 'react';
import { Tooltip, Line, Bar, Legend, CartesianGrid, XAxis, YAxis, ComposedChart } from 'recharts';

const formatData = (jsonData) => {
    const {cases, deaths, recovered} = jsonData;
    const result = [];
    let prevEntry = null;
    for (let [key, value] of Object.entries(cases)) {
        const entry = { date: key, cases: value, deaths: deaths[key], recovered: recovered[key] };
        if (prevEntry) {
            entry.newCases = entry.cases - prevEntry.cases;
            entry.newDeaths = entry.deaths - prevEntry.deaths;
        } else {
            entry.newCases = 0;
            entry.newDeaths = 0;
        }
        prevEntry = entry;
        result.push(entry)
    }
    return result;
}

const CasesPerCountry = () => {
    const [cases, setCases] = useState(null);
    const barMargin = { top: 5, right: 30, left: 20, bottom: 5 }

    useEffect(() => {
        fetch('https://corona.lmao.ninja/v2/historical/id?lastdays=28')
            .then(res => res.json())
            .then(res => {
                setCases(formatData(res.timeline)); 
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log('Error:', error);
                }
            )
    }, [])

    return (<ComposedChart width={640} height={200} data={cases} margin={barMargin}>
        <CartesianGrid stroke="#ccc" strokeDasharray="2 1" />
        <XAxis stroke="grey" padding={{ left: 5, right: 2 }} dataKey="date" />
        <YAxis />
        <Tooltip contentStyle={{backgroundColor: 'grey'}}/>
        <Legend />
        <Bar dataKey="newCases" stroke="orange" fill="yellow"/>
        <Bar dataKey="newDeaths" stroke="red" fill="pink"/>
    </ComposedChart>);
}

export default CasesPerCountry;