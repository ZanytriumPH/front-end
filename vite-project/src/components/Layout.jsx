import {Footer} from "./elements/Footer.jsx";
import {Navbar} from "./elements/Navbar.jsx";
import {useEffect} from "react";

export const Layout = ({ title, children }) => {
    // useEffect：是 React 核心 Hook，用于在组件渲染后执行副作用操作（如修改 DOM、发起网络请求、订阅事件等）。
    // 回调函数：() => { ... } 里的逻辑会在组件挂载 / 更新后执行。
    // 依赖数组：[title] 表示只有当 title 变化时，才会重新运行回调（避免无效执行）。
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