import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CasesChart from './CasesChart';
import NewCasesChart from './NewCasesChart';
import CountryHeader from './CountryHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
    },
    content: {
        fontSize: 11
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

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

const CasesPerCountry = ({ country }) => {
    const classes = useStyles();
    const [timelineData, setTimelineData] = useState(null);
    const [countryProfiles, setCountryProfiles] = useState({});

    useEffect(() => {
        if (country) {
            fetch('https://corona.lmao.ninja/v2/countries/' + country.code)
                .then(res => res.json())
                .then(res => {
                    setCountryProfiles(res)
                },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log('Error:', error);
                    }
                )            
            fetch(`https://corona.lmao.ninja/v2/historical/${country.code}?lastdays=14`)
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
        <Card className={classes.root}>
            <CountryHeader countryProfiles={countryProfiles} />
            <CardContent className={classes.content}>
                <CasesChart data={timelineData} />
            </CardContent>
            <CardContent className={classes.content}>
                <NewCasesChart data={timelineData} />
            </CardContent>
        </Card>
    </React.Fragment>);
}

export default CasesPerCountry;