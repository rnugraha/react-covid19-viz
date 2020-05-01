import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { countries } from './countries'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Link from '@material-ui/core/Link';
import { FormHelperText } from '@material-ui/core';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function valuetext(value) {
    return `Day ${value}`;
}

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const LeftDrawer = (props) => {
    const classes = useStyles();
    const handleOnCountryChange = (event, value, reason) => {
        props.onSelectCountry(event, value, reason)
    };
    const handleOnCasesChange = (event) => {
        props.onCasesChange(event);
    };
    const handleOnDailyCasesChange = (event) => {
        props.onDailyCasesChange(event);
    };
    const { cases, recovered, deaths } = props.selectedCases;
    const { newCases, newDeaths } = props.selectedNewCases;
    const { weeks } = props;
    const error = [cases, recovered, deaths].filter((v) => v).length < 1;

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <FormControl className={classes.formControl}>
            <Autocomplete
                multiple
                id="country-select-demo"
                options={countries}
                classes={{
                    option: classes.option,
                }}
                autoHighlight
                onChange={handleOnCountryChange}
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
                    <React.Fragment>
                        <span>{countryToFlag(option.code)}</span>
                        {option.label} ({option.code})
                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select a country"
                        variant="outlined"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
            <FormHelperText>You may select >1 countries</FormHelperText>
            </FormControl>
            <Divider />
            <FormControl className={classes.formControl}>
                <Typography gutterBottom>
                    Show data in # of weeks
                </Typography>
                <Slider
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={true}
                    min={1}
                    max={12}
                    value={weeks}
                    onChange={props.onWeeksChange}
                />
            </FormControl>
            <FormControl component="fieldset" error={error} className={classes.formControl} required>
                <FormLabel component="legend">Total accumulation</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={cases} onChange={handleOnCasesChange} name="cases" />}
                        label="Cases"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={recovered} onChange={handleOnCasesChange} name="recovered" />}
                        label="Recovered"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={deaths} onChange={handleOnCasesChange} name="deaths" />}
                        label="Deaths"
                    />
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset" error={error} className={classes.formControl} required>
                <FormLabel component="legend">Daily cases</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={newCases} onChange={handleOnDailyCasesChange} name="newCases" />}
                        label="New cases"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={newDeaths} onChange={handleOnDailyCasesChange} name="newDeaths" />}
                        label="New deaths"
                    />
                </FormGroup>
            </FormControl>
            <Divider />
            <Typography className={classes.formControl} variant="body2" gutterBottom>                
                Data source: <Link href="https://github.com/NovelCOVID/API">
                    NovelCOVID API
                </Link>
            </Typography>
        </Drawer>

    );
}

export default LeftDrawer;