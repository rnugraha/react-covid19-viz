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

const CasesPerCountry = ({ country, cases, newCases, weeks }) => {
    const classes = useStyles();
    const [timelineData, setTimelineData] = useState(null);
    const [countryProfiles, setCountryProfiles] = useState({});
    const [expanded, setExpanded] = React.useState(false);
    const days = weeks * 7;

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
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
            fetch(`https://corona.lmao.ninja/v2/historical/${country.code}?lastdays=${days}`)
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
    }, [country, weeks])

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