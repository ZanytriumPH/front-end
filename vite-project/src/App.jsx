// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from "./components/Layout.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { ActivityList } from "./components/sections/ActivityList.jsx";
import { Mine } from "./components/sections/Mine.jsx";
import { RouteSwitchButtons } from './components/elements/RouteSwitchButtons.jsx';
import { ActivityDetail } from './components/sections/ActivityDetail.jsx';

function App() {
    return (
        <Router>
            <Layout title="无界律动">
                <div className="router-view">
                    <AnimatedRoutes />
                </div>
                <RouteSwitchButtons />
            </Layout>
        </Router>
    );
}

// 创建一个包装组件来处理动画
const AnimatedRoutes = () => {
    const location = useLocation();

    const pageVariants = {
        initial: { opacity: 0, y: 10 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -10 }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.3
    };

    return (
        <Routes location={location}>
            <Route
                path="/"
                element={
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <Hero />
                    </motion.div>
                }
            />
            <Route
                path="/ActivityList"
                element={
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <ActivityList />
                    </motion.div>
                }
            />
            <Route
                path="/Mine"
                element={
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <Mine />
                    </motion.div>
                }
            />
            <Route
                path="/ActivityDetail/:id"
                element={
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        <ActivityDetail />
                    </motion.div>
                }
            />
        </Routes>
    );
};

export default App;