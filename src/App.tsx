import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/error-page/error-page";
import Layout from "./components/layout/layout";
import MainPage from "./pages/main-page/main-page";
import NewWordsPage from "./pages/new-words-page/new-words-page";
import TestPage from "./pages/test-page/test-page";
import ResultsPage from "./pages/results-page/results-page";
import { ROUTES } from "./constants";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.Home} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={ROUTES.NewWords} element={<NewWordsPage />} />
        <Route path={ROUTES.Test} element={<TestPage />} />
        <Route path={ROUTES.Results} element={<ResultsPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
