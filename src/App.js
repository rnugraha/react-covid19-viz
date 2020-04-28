import React, { useState } from 'react';
import './App.css';
import CasesPerCountry from './components/CasesPerCountry';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LeftDrawer from './components/LeftDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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

function App() {

  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleOnSelectCountry = (event, value, reason) => {
    setSelectedCountry(value);
    console.log(value)
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
        {selectedCountry ? <CasesPerCountry country={selectedCountry}/> : 'Select country'}
      </main>
    </React.Fragment>
  );
}

export default App;
