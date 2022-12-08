import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import NoPages from "./pages/NoPages.js";
import ChainInfo from './pages/chain-info.js';
import FakeBaycActions from './pages/fakeBayc.js';
import FakeNefturiansActions from './pages/fakeNefturians.js';


//import Test from './Test.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ChainInfo />} />
          <Route path="fakebayc" element={<FakeBaycActions />} />
          <Route path="chain-info" element={<FakeBaycActions />} />
          <Route path="fakeNefturians" element={<FakeNefturiansActions />} />
          <Route path="*" element={<NoPages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




