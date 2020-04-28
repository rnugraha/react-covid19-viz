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

const CasesPerCountry = ({country}) => {
    const [timelineData, setTimelineData] = useState(null);

    useEffect(() => {
        if (country) {
            fetch(`https://corona.lmao.ninja/v2/historical/${country.code}?lastdays=60`)
            .then(res => res.json())
            .then(res => {
                if (!res.message) {
                    setTimelineData(formatData(res.timeline));
                } else {
                    console.log(res.message)
                }
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log('Error:', error);
                }
            )
        }
    }, [country])

    return (<React.Fragment>
        <CasesChart data={timelineData} />
        <NewCasesChart data={timelineData} />
        <CountryProfile country={country} />
    </React.Fragment>);
}

export default CasesPerCountry;