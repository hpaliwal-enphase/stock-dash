import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components
import { HomePage } from "./components/Home";
import { CurrenciesPage } from "./components/Currencies";

// React-query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/currencies">Currencies</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/currencies" element={<CurrenciesPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
