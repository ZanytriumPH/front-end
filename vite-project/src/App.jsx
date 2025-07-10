// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from "./components/Layout.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { Discovery } from "./components/sections/Discovery.jsx";
import { Mine } from "./components/sections/Mine.jsx";
function App() {
    return (
        <Router>
            <Layout title="无界律动">
                <Hero />
                <Discovery />
                <Mine />
            </Layout>
        </Router>
    );
}

export default App;