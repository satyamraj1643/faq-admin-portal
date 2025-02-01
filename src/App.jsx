import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FAQForm from './components/CreateFAQ';
import FAQHomepage from './components/HomePage';
import GetFAQ from './components/GetFAQ';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FAQHomepage />} />
                <Route path="/get-faq" element={<GetFAQ/>} />
                <Route path="/create-faq" element={<FAQForm />} />
            </Routes>
        </Router>
    );
}

export default App;