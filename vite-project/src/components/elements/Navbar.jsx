// src/components/elements/Navbar.jsx
import { Container } from "../shared/Container.jsx";
import logo from "../../assets/logo.png";
import { BtnLink } from "../shared/BtnLink.jsx";
import { useThemeStore } from "../../store/ThemeStore.jsx";
import { useState, useEffect } from "react";
import { LoginRegisterCard } from "../cards/LoginRegisterCard.jsx";
import { useLocation, useNavigate } from 'react-router-dom';

const routes = [
    { path: '/', name: '首页' },
    { path: '/ActivityList', name: '活动列表' },
    { path: '/Mine', name: '我的' }
];

export const Navbar = () => {
    const { toggleTheme, theme } = useThemeStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(100);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedBalance = localStorage.getItem('balance');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedBalance) {
            setBalance(parseFloat(storedBalance));
        }

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 监听自定义事件
        const handleUserLoggedIn = (event) => {
            const { username, balance } = event.detail;
            setUsername(username);
            setBalance(balance);
        };
        window.addEventListener('userLoggedIn', handleUserLoggedIn);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('userLoggedIn', handleUserLoggedIn);
        };
    }, []);

    useEffect(() => {
        const storedBalance = localStorage.getItem('balance');
        if (storedBalance) {
            setBalance(parseFloat(storedBalance));
        }
    }, [localStorage.getItem('balance')]);

    useEffect(() => {
        const index = routes.findIndex(route => route.path === location.pathname);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    }, [location.pathname]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('balance');
        setUsername('');
        setBalance(0);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`fixed inset-x-0 top-0 z-50 py-4 bg-body bg-box-bg ${isScrolled ? 'py-2 shadow-md' : 'py-4 shadow-sm'} transition-navbar`}>
            <Container>
                <nav className="w-full flex justify-between gap-6 relative">
                    {/* Logo */}
                    <div className="min-w-max inline-flex relative">
                        <div className="relative flex items-center gap-3">
                            <img src={logo} alt="logo" className="w-10 h-10" />
                            <div className="inline-flex text-lg font-semibold text-heading-1">
                                无界律动
                            </div>
                        </div>
                    </div>

                    {/* 路由指示器 */}
                    <div className="flex items-center mx-6 space-x-3 lg:flex md:hidden sm:hidden">
                        {routes.map((route, index) => (
                            <div
                                key={route.path}
                                className={`relative transition-all duration-300 cursor-pointer group ${currentIndex === index ? 'opacity-100' : 'opacity-50'}`}
                                onClick={() => {
                                    if (index !== currentIndex) {
                                        navigate(route.path);
                                    }
                                }}
                            >
                                <div className={`absolute bottom-0 left-0 w-full h-1 bg-violet-600 transition-all duration-300 ${currentIndex === index ? 'scale-x-100' : 'scale-x-0'}`}></div>
                                {/* 添加自定义类名来增大并加粗字体 */}
                                <span className="text-heading-2 font-bold text-xl">{route.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* 登录/注册按钮和主题切换按钮 */}
                    <div className="min-w-max flex items-center gap-x-3">
                        {/* 根据有无本地存储的用户名进行切换 */}
                        {username ? (
                            <>
                                <span className="text-heading-2">{username}</span>
                                <span className="text-heading-2">余额: {balance} 元</span>
                                <BtnLink
                                    text="退出登录"
                                    href="#"
                                    className=""
                                    onClick={handleLogout}
                                />
                            </>
                        ) : (
                            <BtnLink
                                text="登录/注册"
                                href="#"
                                className=""
                                onClick={openModal}
                            />
                        )}
                        <button
                            onClick={toggleTheme}
                            className="outline-hidden border-2 flex relative text-heading-2 rounded-full p-1 lg:p-1 border-box-border cursor-pointer"
                        >
                            {theme === "dark" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z"/>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591 -1.591M12 21v-2.25m-6.364-.386l1.591 -1.591M3 12h2.25m.386-6.364l1.591 1.591M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"
                                    />
                                </svg>
                            )}
                        </button>
                        <button
                            className="lg:hidden text-heading-2 cursor-pointer"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </Container>
            <LoginRegisterCard isOpen={isModalOpen} onClose={closeModal} />
            <div className={`lg:hidden ${isMobileMenuOpen ? 'block animate-fade-in' : 'hidden'}`}>
                {/* 移动端菜单内容 */}
                <ul className="flex flex-col gap-x-3 text-lg text-heading-2 items-center">
                    {routes.map((route, index) => (
                        <li key={index}>
                            <a
                                href={route.path}
                                className={`duration-300 font-medium ease-linear hover:text-primary py-3 ${currentIndex === index ? 'text-primary' : ''} font-bold text-xl`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (index !== currentIndex) {
                                        navigate(route.path);
                                    }
                                    toggleMobileMenu();
                                }}
                            >
                                {route.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};