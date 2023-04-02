import { createTheme } from '@mui/material'
import { Button, Typography } from '@mui/material'
const GLOBALSTYLES = {
  body: {
    margin: 0,
  },
  html: {
    fontSize: '.8vw',
  },
}

const theme = createTheme({
  theme_name: 'viscon',
  globalStyles: GLOBALSTYLES,
  palette: {
    text: {
      secondary: '#f0f0f0',
    },
  },
  typography: {
    h1: {
      fontSize: '3.5rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2.2rem',
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.9rem',
    },
    h6: {
      fontSize: '1.7rem',
    },

    subtitle1: {
      fontSize: '1.2rem',
    },

    subtitle2: {
      fontSize: '1.4rem',
    },

    body1: {
      fontSize: '1.5rem',
    },

    body2: {
      fontSize: '1.6rem',
    },
    title1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {},
      },
    },
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          // '-webkit-box-shadow': `0 0 0 100px ${COLORS.BACKGROUND_MAIN} inset`,
          WebkitTextFillColor: '#fff',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // fontSize: '1.19rem',
          textTransform: 'capitalize',
          borderRadius: '6px',

          '&:disabled': {
            // backgroundColor: COLORS.PRIMARY_MAIN,
            color: '#fff',
            opacity: '0.5',
          },
        },
        outlined: {},
        contained: {
          '&$disabled': {
            opacity: 0.5,
          },
          '&:active': {
            boxShadow: null,
          },
          '&:hover': {
            boxShadow: null,
          },
          boxShadow: null,
        },
        containedPrimary: {
          '&:active': {
            opacity: 0.8,
          },
          '&:hover': {
            opacity: 0.9,
          },
        },
      },
    },
  },
})

export default theme
