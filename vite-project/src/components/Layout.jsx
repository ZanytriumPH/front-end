// src/components/Layout.jsx
import {Footer} from "./elements/Footer.jsx";
import {Navbar} from "./elements/Navbar.jsx";
import {useEffect} from "react";

export const Layout = ({ title, children }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className={"min-h-screen flex flex-col"}>
            <Navbar />
            {/* pt用于保证不会被导航栏所覆盖到 */}
            <main className="flex flex-col gap-y-10 md:gap-y-16 overflow-y-auto pt-8 flex-grow-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};