import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    marginTop: '5rem',
    display: 'flex',
  },
  linkButton: {
    textDecoration: 'none',
    fontSize: '1.8rem',
    marginLeft: '1rem',
    background: '#f2e4c9',
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '7rem',
    cursor: 'pointer',
  },
}))

export default useStyles;