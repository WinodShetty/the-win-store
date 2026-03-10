// src/App.tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { BottomNav } from "./components/BottomNav";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Success } from "./pages/Success";
import { Admin } from "./pages/Admin";
import EbookGate from "./pages/EbookGate";

import { siteConfig } from "./config/siteConfig";

// ---> 1. ADDED: Import the Analytics Component <---
import { Analytics } from "./components/Analytics";

/* ---------------- Layout Controller ---------------- */

function LayoutWrapper() {
  const location = useLocation();

  const isEbookRoute = location.pathname.startsWith("/ebook");

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-sky-500/30 selection:text-sky-200 pb-20">

      {/* Hide these on ebook pages */}
      {!isEbookRoute && <Navbar />}
      {!isEbookRoute && <CartDrawer />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path={siteConfig.adminRoute} element={<Admin />} />
        <Route path="/ebook/:productId/:language" element={<EbookGate />} />
      </Routes>

      {!isEbookRoute && <Footer />}
      {!isEbookRoute && <BottomNav />}
    </div>
  );
}

/* ---------------- Main App ---------------- */

export default function App() {
  return (
    <AppProvider>
      <Router>
        {/* ---> 2. ADDED: Analytics runs silently on every route change <--- */}
        <Analytics /> 
        <LayoutWrapper />
      </Router>
    </AppProvider>
  );
}