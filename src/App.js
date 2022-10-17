import './App.css';

import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create_Document from './components/MainPage/BBA_Documents/Create_Document';
import Header from './components/initialpage/Sidebar/Header';
import Sidebar from './components/initialpage/Sidebar/sidebar';
import Dashboard from './components/MainPage/Main/Dashboard';

import ViewDocuments from './components/MainPage/BBA_Documents/ViewDocuments';
import DocumentList from './components/MainPage/BBA_Documents/DocumentList';
import PdfView from './components/MainPage/BBA_Documents/PdfView';
import Pdfview2 from './components/MainPage/BBA_Documents/Pdfview2';
 import Catlist from './components/MainPage/BBA_Documents/Catlist';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Sidebar/>
    <Routes>
     
        <Route path="/" element={<Dashboard />} />
        <Route path="/docs" element={<Dashboard />} />


        <Route path="/docs/add" element={<Create_Document />} />
        {/* <Route path="/fileupload" element={<FileUpload />} /> */}
        
        <Route path="/ViewDocuments/:id/:document_id" element={<ViewDocuments />}/>
        <Route path="/pdfview/:name/:recordId" element={<PdfView />}/>
        <Route path="/pdfview2/:name" element={<Pdfview2 />}/>

        <Route path="/docs/cat" element={<Catlist />} />

        <Route path="/docs/list" element={<DocumentList />} />
        {/* <Route path="/docs/list" element={<DocumentList />} /> */}
        
        
            
     
    </Routes>
  </BrowserRouter>

      
    </div>
  );
}

export default App;
