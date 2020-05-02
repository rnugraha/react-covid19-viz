import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import CasesPerCountry from './components/CasesPerCountry';
import Typography from '@material-ui/core/Typography';
import LeftDrawer from './components/LeftDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GitHub from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1
  },
}));

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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
  
  const renderPlots = (countries, selectedCases, selectedNewCases, weeks) => {
    return countries.length ? countries.map(country => {
      return (<Grid item xs={12} lg={4} md={6} key={country.code}>
        <CasesPerCountry country={country} cases={selectedCases} newCases={selectedNewCases} weeks={weeks} />
      </Grid>)
    }) : <Grid item xs={12} key='start'>Start by selecting a country</Grid>;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            COVID-19 Country Viz
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
        onClose={handleDrawerToggle}
        selectedCases={selectedCases}
        selectedNewCases={selectedNewCases}
        weeks={weeks}
        mobileOpen={mobileOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3} key='root'>
          {renderPlots(selectedCountries, selectedCases, selectedNewCases, weeks)}
        </Grid>
      </main>
    </div>
  );
}

export default App;
