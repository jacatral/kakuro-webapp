import './App.css';

import React, { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import GeneratedGrid from './models/grids/generatedGrid.js';
import GridCache from './models/gridCache.js';
import Home from './components/Home.js'
import KakuroController from './components/KakuroController.js';

const sizes = [4, 8, 16];
const PRESEED_COUNT = 3;

function App() {
    const cache = new GridCache(localStorage);

    // Map grids by size, then prepopulate seeds in case there isn't enough seeds
    const generatedGrids = GridCache.mapGridsBySize(localStorage);
    for (const size of sizes) {
        const seeds = generatedGrids[size] || [];
        while (seeds.length < PRESEED_COUNT) {
            const grid = new GeneratedGrid(cache, size);
            grid.generateGrid();
            const seed = grid.getSeed();
            seeds.push(seed);
        }
    }

    const [grids, setGrids] = useState(generatedGrids);

    // Generate a new seed on the spot & redirect
    const generatePuzzle = (size = 4) => {
        const grid = new GeneratedGrid(cache, size);
        grid.generateGrid();
        const seed = grid.getSeed();
        window.location.href = `/puzzle/${seed}`;
    };

    return (
        <BrowserRouter>
            <div className="directory">
                <div id="home"><Link to="/">Home</Link></div>
                <div id="basic1"><Link to="/puzzle/basic1">Introductory Puzzle</Link></div>
                <div id="basic2"><Link to="/puzzle/basic2">Easy 4x4 Puzzle</Link></div>
                {
                    sizes.map((size) => {
                        return (
                            <div id={`random${size}`}><a onClick={() => generatePuzzle(size)}>Random {size}x{size} Puzzle</a></div>
                        )
                    })
                }
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/puzzle/:puzzleSeed" element={<KakuroController key={window.location.pathname} cache={cache} />}/>
            </Routes>
            <div className="generated-grids">
                <span>Randomly Generated Grids</span>
                {
                    Object.entries(grids).map(([size, seedList]) => {
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
