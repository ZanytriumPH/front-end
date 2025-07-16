// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from "./components/Layout.jsx";
import { Hero } from "./components/pages/Hero.jsx";
import { ActivityList } from "./components/pages/ActivityList.jsx";
import { Mine } from "./components/pages/Mine.jsx";
import { RouteSwitchButtons } from './components/elements/RouteSwitchButtons.jsx';
import { ActivityDetail } from './components/pages/ActivityDetail.jsx';
import { MyRegisteredDetail } from "./components/pages/MyRegisteredDetail.jsx";
import { CreateActivity } from "./components/pages/CreateActivity.jsx";

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
        initial: { opacity: 0, y: 20 }, // 稍微增加初始的偏移量
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 } // 稍微增加退出的偏移量
    };

    const pageTransition = {
        type: 'spring', // 使用弹簧过渡类型，使动画更柔和
        damping: 10, // 阻尼值，控制弹簧的弹性程度
        stiffness: 50, // 刚度值，控制弹簧的硬度
        duration: 0.6 // 增加动画持续时间
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
                element={<ActivityDetail />}
            />
            <Route
                path="/MyRegisteredDetail/:id"
                element={<MyRegisteredDetail />}
            />
            <Route
                path="/CreateActivity"
                element={<CreateActivity />}
            />
        </Routes>
    );
};

export default App;