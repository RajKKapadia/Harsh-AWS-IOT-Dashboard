import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Authentication/Login";
import Machine from "./components/Machine/Machine";
import Client from "./components/Client/Client";
import useToken from "./components/hooks/useToken";
import Navbar from "./components/Navbar/Navbar";

const queryClient = new QueryClient();

const App = () => {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/clients" element={<Client />}></Route>
          <Route path="/machines" element={<Machine />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
        </Routes>
      </Router>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
      ></ReactQueryDevtools>
    </QueryClientProvider>
  );
};

export default App;
