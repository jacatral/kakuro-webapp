import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js'
import Kakuro from './components/Kakuro.js';

function App() {
    return (
        <BrowserRouter>
            <div className="directory">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/puzzle/basic1">Introductory Puzzle</Link></li>
                    <li><Link to="/puzzle/basic2">Easy 4x4 Puzzle</Link></li>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/puzzle/:puzzleSeed" element={<Kakuro key={window.location.pathname} />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
