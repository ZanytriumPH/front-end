// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from "./components/Layout.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import AppRoutes from './routes.jsx';

function App() {
    return (
        <Router>
            <Layout title="无界律动">
                <Hero />
                <AppRoutes />
            </Layout>
        </Router>
    );
}

export default App;