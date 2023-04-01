import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.primary.main,
    height: '5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    color: theme.palette.text.secondary,
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '1.5rem',
    color: theme.palette.text.secondary,
    marginLeft:'1rem'
  },
  linkContainer:{
    marginLeft:'2rem',
    display:'flex'
  },
}))

export default useStyles;