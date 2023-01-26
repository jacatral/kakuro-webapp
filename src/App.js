import './App.css';

import Kakuro from './components/Kakuro.js';
import sampleData from './data/basic1.js';

function App() {
    return (
        <Kakuro gridData={sampleData}/>
    );
}

export default App;
