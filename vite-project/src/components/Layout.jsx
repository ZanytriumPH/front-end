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
            <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-y-auto">
                {children}
            </main>
            <Footer />
        </>
    );
};