import {createMuiTheme} from '@material-ui/core';
import createTypography from '@material-ui/core/styles/createTypography';
import {createPalette} from '@material-ui/core/styles';

const theme = createMuiTheme({    
    palette: {
        // primary: { 500: '#2196f3'},
        primary: {
            main: '#2196f3',
            light: '#6ec6ff',
            dark: '#0069c0'
        },
        secondary: { 
            main: '#ff6e40',
            light: '#ffa06d',
            dark: '#c53d13'
        }
    },

    typography: {
        fontFamily: "'Fira Sans', 'sans-serif'",
    },

    overrides: {
      MuiMenuItem:{
          selected:{
              backgroundColor: 'primary-light',
              color:'primary'
          }
      }  
    }
})

export default theme;