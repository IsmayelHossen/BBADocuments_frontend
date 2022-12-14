import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/initialpage/Sidebar/Header";
import Sidebar from "./components/initialpage/Sidebar/sidebar";
import Dashboard from "./components/MainPage//BBA_Documents/Dashboard";
import Create_Document from "./components/MainPage/BBA_Documents/Create_Document";
import ViewDocuments from "./components/MainPage/BBA_Documents/ViewDocuments";
import DocumentList from "./components/MainPage/BBA_Documents/DocumentList";
import PdfView from "./components/MainPage/BBA_Documents/PdfView";
import Docs_Category from "./components/MainPage/BBA_Documents/Docs_Category";
import Test from "./components/MainPage/BBA_Documents/Test";
import Pdfjs from "./components/MainPage/BBA_Documents/Pdfjs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/docs" element={<Dashboard />} />
          <Route path="/docs/add" element={<Create_Document />} />
          <Route path="/docs/category/add" element={<Docs_Category />} />
          <Route
            path="/docs/ViewDocuments/:id/:document_id"
            element={<ViewDocuments />}
          />
          <Route path="/docs/pdfview/:name/:recordId" element={<PdfView />} />
          <Route path="/docs/list" element={<DocumentList />} />
          <Route path="/docs/test" element={<Test />} />
          <Route path="/docs/ab" element={<Pdfjs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
