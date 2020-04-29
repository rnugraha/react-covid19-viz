import React, { useState } from 'react';
import './App.css';
import CasesPerCountry from './components/CasesPerCountry';
import Typography from '@material-ui/core/Typography';
import LeftDrawer from './components/LeftDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const renderPlots = (countries) => {  
  return countries.length ? countries.map(country => {
    return (<Grid item xs={4} direction="row" justify="flex-start" alignItems="flex-start"> 
      <CasesPerCountry country={country} />
    </Grid>)
  }) : '';
}

function App() {

  const classes = useStyles();
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleOnSelectCountry = (event, value, reason) => {
    setSelectedCountries(value);
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            COVID-19 Statistics
          </Typography>
        </Toolbar>
      </AppBar>
      <LeftDrawer onSelectCountry={handleOnSelectCountry} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          {renderPlots(selectedCountries)}
        </Grid>
      </main>
    </React.Fragment>
  );
}

export default App;
