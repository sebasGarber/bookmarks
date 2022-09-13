import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

//npm install stylis stylis-plugin-rtl
// o npm i stylis-plugin-rtl@2.0.2;
//npm install jss-rtl


export default function RtlMaterialCont(props) {

    const {content} = props; 

    //https://mui.com/guides/right-to-left/#demo

    const theme = createTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
    });

    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    


  return (
    <CacheProvider value={cacheRtl}>
        
        <ThemeProvider theme={theme}>
            {content}
        </ThemeProvider>
    </CacheProvider>
  )

}

 