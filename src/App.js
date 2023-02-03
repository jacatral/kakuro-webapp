import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js'
import KakuroController from './components/KakuroController.js';

function App() {
    const generatedGrids = Object.entries(localStorage).reduce((gridMap, [key, gridData]) => {
        const rows = gridData.split('\n');
        const sampleRow = rows[0].split(',');
        const gridSize = sampleRow.length - 1;

        gridMap[gridSize] = gridMap[gridSize] || [];
        gridMap[gridSize].push(key);
        return gridMap;
    }, {});

    return (
        <BrowserRouter>
            <div className="directory">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/puzzle/basic1">Introductory Puzzle</Link></li>
                    <li><Link to="/puzzle/basic2">Easy 4x4 Puzzle</Link></li>
                    <li><Link to="/puzzle/random4">Random 4x4 Puzzle</Link></li>
                    <li><Link to="/puzzle/random8">Random 8x8 Puzzle</Link></li>
                    <li><Link to="/puzzle/random16">Random 16x16 Puzzle</Link></li>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/puzzle/:puzzleSeed" element={<KakuroController key={window.location.pathname} />}/>
            </Routes>
            <div className="generated-grids">
                <span>Randomly Generated Grids</span>
                {
                    Object.entries(generatedGrids).map(([size, seedList]) => {
                        return (
                            <div>
                                <span>{size}</span>
                                <ul>
                                    {
                                        seedList.map((seed) => {
                                            const seedRoute = `/puzzle/${seed}`;
                                            return <li><Link to={seedRoute}>{seed}</Link></li>
                                        })
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
