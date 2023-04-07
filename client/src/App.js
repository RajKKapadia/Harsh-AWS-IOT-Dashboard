import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { QueryClientProvider, QueryClient } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'

import Navbar from './components/Navbar/Navbar';

import { store } from './redux/store'
import { Button, StyledEngineProvider, ThemeProvider, GlobalStyles } from '@mui/material'
import theme from './config/theme'
import Dashboard from './page/dashboard/main/dashboard'
import DashboardCategory from './page/dashboard/category/dashboardCategory'

// const queryClient = new QueryClient()

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={theme.globalStyles} />
          <Router>
            <Navbar></Navbar>
            <Routes>
              {/* <Route path='/' element={<Tags />}></Route> */}
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/dashboard/:category' element={<DashboardCategory />}></Route>
            </Routes>
          </Router>
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'></ReactQueryDevtools> */}
      </Provider>
    </StyledEngineProvider>
  )
}

export default App
