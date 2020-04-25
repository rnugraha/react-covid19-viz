import React, { useEffect, useState } from 'react';
import CasesChart from './CasesChart';
import NewCasesChart from './NewCasesChart';
import CountryProfile from './CountryProfile';

const formatData = (jsonData) => {
    const { cases, deaths, recovered } = jsonData;
    const result = [];
    let prevEntry = null;
    for (let [key, value] of Object.entries(cases)) {
        // const entry = { date: key, cases: Math.log(value), deaths: Math.log(deaths[key]), recovered: Math.log(recovered[key]) };
        const entry = { date: key, cases: value, deaths: deaths[key], recovered: recovered[key] };
        if (prevEntry) {
            entry.newCases = entry.cases - prevEntry.cases;
            entry.newDeaths = entry.deaths - prevEntry.deaths;
        }
        prevEntry = entry;
        result.push(entry)
    }
    return result;
}

const CasesPerCountry = () => {
    const [timelineData, setTimelineData] = useState(null);

    useEffect(() => {
        fetch('https://corona.lmao.ninja/v2/historical/cn?lastdays=60')
            .then(res => res.json())
            .then(res => {
                setTimelineData(formatData(res.timeline));
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log('Error:', error);
                }
            )
    }, [])

    return (<React.Fragment>
        <CasesChart data={timelineData} />
        <NewCasesChart data={timelineData} />
        <CountryProfile />
    </React.Fragment>);
}

export default CasesPerCountry;