// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Layout } from "./components/Layout.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { ActivityList } from "./components/sections/ActivityList.jsx";
import { Mine } from "./components/sections/Mine.jsx";
import { RouteSwitchButtons } from './components/elements/RouteSwitchButtons.jsx';

function App() {
    return (
        <Router>
            <Layout title="无界律动">
                <div className="router-view">
                    <AnimatedRoutes /> {/* 使用动画路由组件 */}
                </div>
                <RouteSwitchButtons />
            </Layout>
        </Router>
    );
}

// 创建一个包装组件来处理动画
const AnimatedRoutes = () => {
    const location = useLocation(); // 获取当前路由位置

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key} // 使用路由的唯一key
                timeout={300}
                classNames="fade"
            >
                <Routes location={location}>
                    <Route path="/" element={<Hero />} />
                    <Route path="/ActivityList" element={<ActivityList />} />
                    <Route path="/Mine" element={<Mine />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default App;