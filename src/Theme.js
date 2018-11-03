import React from 'react';
import { createTheming } from 'react-jss';

export const theming = createTheming('estoque');

const { ThemeProvider } = theming

export const defaultTheme = {
  primaryColor: 'steelblue'
}

const Theme = (props) => {
    var selectedTheme = props.theme || defaultTheme
    return <ThemeProvider theme={selectedTheme}>{props.children}</ThemeProvider>
}

export default Theme;
