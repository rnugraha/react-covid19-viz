import React, { useState } from 'react';
import './App.css';
import CasesPerCountry from './components/CasesPerCountry';
import Typography from '@material-ui/core/Typography';
import LeftDrawer from './components/LeftDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import GitHub from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginLeft: 240
  },
  title: {
    flexGrow: 1
  },
}));

const renderPlots = (countries, selectedCases, selectedNewCases, weeks) => {
  return countries.length ? countries.map(country => {
    return (<Grid item xs={4} key={country.code}>
      <CasesPerCountry country={country} cases={selectedCases} newCases={selectedNewCases} weeks={weeks} />
    </Grid>)
  }) : <Grid item xs={12} key='start'>Start by selecting a country</Grid>;
}

function App() {

  const classes = useStyles();
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCases, setselectedCases] = useState({
    cases: true,
    recovered: true,
    deaths: true,
  });
  const [selectedNewCases, setselectedNewCases] = useState({
    newCases: true,
    newDeaths: true,
  });
  const [weeks, setWeeks] = React.useState(3);

  const handleOnSelectCountry = (event, value, reason) => {
    setSelectedCountries(value);
  }

  const handleOnCasesChange = (event) => {
    setselectedCases({ ...selectedCases, [event.target.name]: event.target.checked });
  };

  const handleOnDailyCasesChange = (event) => {
    setselectedNewCases({ ...selectedNewCases, [event.target.name]: event.target.checked });
  };

  const handleOnWeeksChange = (event, value) => {
    setWeeks(value)
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            COVID-19 Country Visualisation
          </Typography>
          <IconButton
            aria-label="github"
            color="inherit"
            href="https://github.com/rnugraha/react-covid19-viz"
          >
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>
      <LeftDrawer
        onSelectCountry={handleOnSelectCountry}
        onCasesChange={handleOnCasesChange}
        onDailyCasesChange={handleOnDailyCasesChange}
        onWeeksChange={handleOnWeeksChange}
        selectedCases={selectedCases}
        selectedNewCases={selectedNewCases}
        weeks={weeks}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} key='root'>
          {renderPlots(selectedCountries, selectedCases, selectedNewCases, weeks)}
        </Grid>
      </main>
    </React.Fragment>
  );
}

export default App;
