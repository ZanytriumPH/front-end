// src/components/elements/Footer.jsx
import React from 'react';
import { Container } from '../shared/Container.jsx';
import logo from '../../assets/logo.png'; // 导入logo图片
import WeChatIcon from '../../assets/Footer/WeChat.png';
import QQIcon from '../../assets/Footer/QQ.png';
import TikTokIcon from '../../assets/Footer/TikTok.png';

const socialLinks = [
    {
        id: 1,
        name: '微信',
        icon: WeChatIcon,
        link: '#'
    },
    {
        id: 2,
        name: 'QQ',
        icon: QQIcon,
        link: '#'
    },
    {
        id: 3,
        name: '抖音',
        icon: TikTokIcon,
        link: '#'
    }
];

export const Footer = () => {
    return (
        <footer className="bg-box-bg py-8">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <img src={logo} alt="logo" className="w-10 h-10" />
                        <div className="inline-flex text-lg font-semibold text-heading-1">
                            无界律动
                        </div>
                    </div>
                    <p className="text-heading-3 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} 无界律动. 保留所有权利.
                    </p>
                    <div className="flex gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={link.icon}
                                    alt={link.name}
                                    className="w-6 h-6"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
};