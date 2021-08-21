import * as React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recommendations from './Pages/Recommendations';
import SidebarWithHeader from './Components/Sidebar';

/* <ColorModeSwitcher justifySelf="flex-end" /> */

const theme = extendTheme({
  colors: {
    brand: {
      100: '#98c21d',
      200: '#55585a',
      300: '#006072',
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <SidebarWithHeader>
        <Switch>
          <Route exact path='/' component={Recommendations} />
        </Switch>
      </SidebarWithHeader>
    </BrowserRouter>
  </ChakraProvider>
);
