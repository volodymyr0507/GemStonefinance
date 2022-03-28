//Your theme for the new stuff using material UI has gemn copied here so it doesn't conflict
import {createMuiTheme} from '@material-ui/core/styles';

const newTheme = createMuiTheme({
  palette: {
    type: 'light',
    text: {
      primary: '#dddfee',
      secondary: 'white',
      yellow: '#155aca',
    },
    background: {
      default: '#121212',
      paper: '#d3c7b826',
    },
    primary: {
      light: '#ffe066',
      main: '#2c2560',
      dark: '#b38f00',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    action: {
      disabledBackground: '#CDCDCD',
      active: '#000',
      hover: '#fff',
    },
  },
  typography: {
    color: '#2c2560',
    fontFamily: ['"Rubik"', 'sans-serif'].join(','),
  },
});

export default newTheme;
