// src/App.jsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Layout } from "./components/Layout.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { ActivityList } from "./components/sections/ActivityList.jsx";
import { Mine } from "./components/sections/Mine.jsx";
function App() {
    return (
        <Router>
            <Layout title="无界律动">
                {/*<Hero />*/}
                {/*<ActivityList />*/}
                {/*<Mine />*/}
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/ActivityList" element={<ActivityList />} />
                    <Route path="/Mine" element={<Mine />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;