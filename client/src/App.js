import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Machine from "./components/Machine/Machine";
import Client from "./components/Client/Client";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    localStorage.setItem("hello", "test");
  });
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <h1>Application</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/clients" element={<Client />}></Route>
          <Route path="/machines" element={<Machine />}></Route>
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
