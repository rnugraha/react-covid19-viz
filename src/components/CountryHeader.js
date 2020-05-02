import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: red[500],
    },
}));

const CountryHeader = ({ countryProfiles }) => {
    const classes = useStyles();
    return (<React.Fragment>
        <CardHeader
            avatar={
                <Avatar 
                    aria-label="country code" 
                    className={classes.avatar} 
                    src={(countryProfiles.countryInfo || {}).flag} />
            }
            title={`${countryProfiles.country } - ${countryProfiles.continent}`}
            subheader={`${countryProfiles.cases} cases, ${countryProfiles.deaths} deaths, ${countryProfiles.recovered} recovered`}
        />
    </React.Fragment>);
}

export default CountryHeader;