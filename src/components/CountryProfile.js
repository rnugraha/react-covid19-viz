import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
});

const CountryProfile = (props) => {
    const { countryProfiles } = props;
    const classes = useStyles();
    const updated = new Date(countryProfiles.updated)
    return (
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Variable</TableCell>
                    <TableCell align="right">#</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">Active cases</TableCell>
                    <TableCell align="right">{countryProfiles.active}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Cases</TableCell>
                    <TableCell align="right">{countryProfiles.cases}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Cases per 1M</TableCell>
                    <TableCell align="right">{countryProfiles.casesPerOneMillion}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Critical</TableCell>
                    <TableCell align="right">{countryProfiles.critical}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Deaths</TableCell>
                    <TableCell align="right">{countryProfiles.deaths}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Deaths per 1M</TableCell>
                    <TableCell align="right">{countryProfiles.deathsPerOneMillion}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Recovered</TableCell>
                    <TableCell align="right">{countryProfiles.recovered}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Tests</TableCell>
                    <TableCell align="right">{countryProfiles.tests}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Tests per 1M</TableCell>
                    <TableCell align="right">{countryProfiles.testsPerOneMillion}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Today's cases</TableCell>
                    <TableCell align="right">{countryProfiles.todayCases}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Today's deaths</TableCell>
                    <TableCell align="right">{countryProfiles.todayDeaths}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">Last updated</TableCell>
                    <TableCell align="right">{updated.toLocaleString("en-US")}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default CountryProfile;