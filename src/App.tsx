import * as React from 'react';
import {
  Center,
  ChakraProvider,
  extendTheme,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recommendations from './Pages/Recommendations';
import SidebarWithHeader from './Components/Sidebar';
import ReportsPage from './Pages/Reports';

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
          <Route exact path='/reports' component={ReportsPage} />
          <Route
            path='*'
            render={() => (
              <Center h='full'>
                <VStack>
                  <Heading fontSize='8xl'>404</Heading>
                  <Text>Page not found!</Text>
                </VStack>
              </Center>
            )}
          />
        </Switch>
      </SidebarWithHeader>
    </BrowserRouter>
  </ChakraProvider>
);
