import React from "react";
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import Intro from "./pages/Intro.js";
import NoPages from "./pages/NoPages.js";
import ChainInfo from './pages/Chain-info.js';
import FakeBaycActions from './pages/FakeBayc.js';
import FakeBaycTokenInfo from './pages/FakeBaycTokenInfo.js';
import FakeNefturiansActions from './pages/FakeNefturians.js';
import FakeNefturiansInfos from './pages/FakeNefturiansInfos.js';
import FakeMeebitsActions from './pages/FakeMeebits.js';




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="chain-info" element={<ChainInfo />} />
          <Route path="fakebayc" element={<FakeBaycActions />} />
          <Route path="fakeBayc/:tokenID" element={<FakeBaycTokenInfo />} />
          <Route path="fakeNefturians/:address" element={<FakeNefturiansInfos />} />
          <Route path="fakeNefturians" element={<FakeNefturiansActions />} />
          <Route path="fakeMeebits" element={<FakeMeebitsActions />} />
          <Route path="*" element={<NoPages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




