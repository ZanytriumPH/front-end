// src/components/elements/Navbar.jsx
import { Container } from "../shared/Container.jsx";
import logo from "../../assets/logo.png";
import { NavItem } from "../shared/NavItem.jsx";
import { BtnLink } from "../shared/BtnLink.jsx";
import { useThemeStore } from "../../store/ThemeStore.jsx";
import { useState, useEffect } from "react";
import { LoginRegisterCard } from "../cards/LoginRegisterCard.jsx";

const navItems = [
    {
        href: "/",
        text: "首页",
    },
    {
        href: "/ActivityList",
        text: "活动列表",
    },
    {
        href: "/Mine",
        text: "我的",
    },
];

export const Navbar = () => {
    const { toggleTheme, theme } = useThemeStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(100);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedBalance = localStorage.getItem('balance');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedBalance) {
            setBalance(parseFloat(storedBalance));
        }
    }, []);

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

    return (
        <header className="fixed inset-x-0 top-0 z-50 py-4 bg-body bg-box-bg">
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

                    {/* 导航项 */}
                    <ul className="hidden lg:flex gap-x-3 text-lg text-heading-2 items-center">
                        {navItems.map((item, key) => (
                            <NavItem href={item.href} text={item.text} key={key} />
                        ))}
                    </ul>

                    {/* 登录/注册按钮和主题切换按钮 */}
                    <div className="min-w-max flex items-center gap-x-3">
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
                                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z"
                                    />
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
                    </div>
                </nav>
            </Container>
            <LoginRegisterCard isOpen={isModalOpen} onClose={closeModal} />
        </header>
    );
};