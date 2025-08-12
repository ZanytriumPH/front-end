// 通用布局容器

import {Footer} from "./elements/Footer.jsx";
import {Navbar} from "./elements/Navbar.jsx";
import {RouteSwitchButtons} from "./elements/RouteSwitchButtons.jsx";
import {useEffect} from "react";


export const Layout = ({ title, children }) => {
    useEffect(() => {
        document.title = title; // 可以重写页面标题，覆盖html中的title
    }, [title]);

    return (
        <div className={"min-h-screen flex flex-col"}>
            <Navbar />
            {/* pt用于保证不会被导航栏所覆盖到 */}
            <main className="flex flex-col gap-y-10 md:gap-y-16 overflow-y-auto pt-8 flex-grow-1">
                {children}
            </main>
            <Footer />
            <RouteSwitchButtons />
        </div>
    );
};