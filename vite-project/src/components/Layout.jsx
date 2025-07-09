// src/components/Layout.jsx
import {Footer} from "./elements/Footer.jsx";
import {Navbar} from "./elements/Navbar.jsx";
import {useEffect} from "react";

export const Layout = ({ title, children }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <Navbar />
            {/* 缩短 gap-y 的值 */}
            <main className="flex flex-col gap-y-10 md:gap-y-16 overflow-y-auto">
                {children}
            </main>
            <Footer />
        </>
    );
};