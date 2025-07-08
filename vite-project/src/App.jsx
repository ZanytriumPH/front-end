// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from "./components/Layout.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { Discovery } from "./components/sections/Discovery.jsx";
import { ActivityDetailCard } from "./components/cards/ActivityDetailCard.jsx";

function App() {
    return (
        <Router>
            <Layout title="无界律动">
                <Hero />
                <Routes>
                    <Route path="/" element={<Discovery />} />
                    <Route path="/activity/:id" element={<ActivityDetailCard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;