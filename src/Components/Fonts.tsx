import * as React from 'react';
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('../assets/fonts/AvenirLTStd-Book.otf') format('otf');
      }
      @font-face {
        font-family: 'Avenir';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('../assets/fonts/AvenirLTStd-Medium.otf') format('otf');
      }
      `}
  />
);

export default Fonts;
