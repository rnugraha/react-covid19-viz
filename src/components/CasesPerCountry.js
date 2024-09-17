import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CasesChart from './CasesChart';
import NewCasesChart from './NewCasesChart';
import CountryHeader from './CountryHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CountryProfile from './CountryProfile';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
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
    avatar: {
        backgroundColor: red[500],
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

const formatData = (jsonData, isLogarithmic) => {
    const { cases, deaths, recovered } = jsonData;
    const result = [];
    let prevEntry = null;
    for (let [key, value] of Object.entries(cases)) {
        const entry = { date: key, cases: value, deaths: deaths[key], recovered: recovered[key] };
        if (isLogarithmic) {
            entry.cases = Math.log(value)
            entry.deaths = Math.log(deaths[key])
            entry.recovered = Math.log(recovered[key])
        }
        if (prevEntry) {
            entry.newCases = entry.cases > prevEntry.cases ? entry.cases - prevEntry.cases : 0;
            entry.newDeaths = entry.deaths > prevEntry.deaths ? entry.deaths - prevEntry.deaths : 0;
        }
        prevEntry = entry;
        result.push(entry)
    }
    return result;
}

const CasesPerCountry = ({ country, cases, newCases, weeks, isLogarithmic }) => {
    const classes = useStyles();
    const [timelineData, setTimelineData] = useState(null);
    const [countryProfiles, setCountryProfiles] = useState({});
    const [expanded, setExpanded] = React.useState(true);
    const [error, setError] = React.useState(null);
    const days = weeks * 7;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (country) {
            fetch('https://disease.sh/v3/covid-19/countries/' + country.code)
                .then(res => res.json())
                .then(res => {
                    if (!res.message) {
                        setCountryProfiles(res)
                    }
                },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log('Error:', error);
                        setError(error);
                    }
                )
            fetch(`https://disease.sh/v3/covid-19/historical/${country.code}?lastdays=${days}`)
            .then(res => res.json())
                .then(res => {
                    if (!res.message) {
                        setTimelineData(formatData(res.timeline, isLogarithmic));
                        setError(null);
                    } else {
                        console.log('Error:', res.message)
                        setError(res.message);
                    }
                },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log('Error:', error);
                        setError(error);
                    }
                )
        }
    }, [country, weeks, days, isLogarithmic])

    if (error) {
        return (<Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        NA
                    </Avatar>
                }
                title='No Data'
                subheader='Country doesnt have data or information'
            />
        </Card>);
    }

    return (<React.Fragment>
        <Card className={classes.root}>
            <CountryHeader countryProfiles={countryProfiles} />
            <CardContent className={classes.content}>
                <CasesChart data={timelineData} options={cases} />
            </CardContent>
            <CardContent className={classes.content}>
                <NewCasesChart data={timelineData} options={newCases} />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <CountryProfile countryProfiles={countryProfiles} />
                </CardContent>
            </Collapse>
        </Card>
    </React.Fragment>);
}

export default CasesPerCountry;