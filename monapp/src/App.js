import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import NoPages from "./pages/NoPages.js";
import ChainInfo from './pages/Chain-info.js';
import FakeBaycActions from './pages/FakeBayc.js';
import FakeBaycTokenInfo from './pages/FakeBaycTokenInfo.js';
import FakeNefturiansActions from './pages/FakeNefturians.js';




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ChainInfo />} />
          <Route path="fakebayc" element={<FakeBaycActions />} />
          <Route path="FakeBaycTokenInfo" element={<FakeBaycTokenInfo />} />
          <Route path="chain-info" element={<ChainInfo />} />
          <Route path="fakeNefturians" element={<FakeNefturiansActions />} />
          <Route path="*" element={<NoPages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




