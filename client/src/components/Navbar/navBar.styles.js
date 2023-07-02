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
    position: 'relative',
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '1.5rem',
    color: theme.palette.text.secondary,
    marginLeft: '1rem',
  },
  linkContainer: {
    marginLeft: '2rem',
    display: 'flex',
  },
  sideBar: {
    width: '20rem',
    height: 'calc(100vh - 5rem)',
    background: `#e9eef7`,
    position: 'absolute',
    top: '5rem',
    left: '0',
    padding: '3rem',
  },
  sideBarItem: {
    fontSize: '1.5rem',
    padding: '1rem',
    border: '1px solid',
    marginBottom: '1rem',
    borderRadius: '0.3rem',
    cursor: 'pointer',
  },
  activeSideBarItem: {
    background: '#d0ddf5',
  },
  contentContainer: {
    marginLeft: '26rem',
  },
}))

export default useStyles;