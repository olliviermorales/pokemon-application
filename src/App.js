import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from './components/Header';
import LandingContainer from './components/LandingContainer';
import MyTeamContainer from './components/MyTeamContainer';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingContainer} />
          <Route exact path="/my-team" component={MyTeamContainer} />
        </Switch>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
