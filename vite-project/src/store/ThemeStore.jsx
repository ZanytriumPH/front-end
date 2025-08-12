import { create } from 'zustand'; // 用于创建状态存储容器（store），是 Zustand 的核心 API
import { persist } from 'zustand/middleware'; // 用于持久化状态的中间件，能将状态保存到 localStorage ，避免页面刷新后状态丢失

// 定义主题类型
const Theme = {
    LIGHT: 'light',
    DARK: 'dark'
};

// 创建主题存储
export const useThemeStore = create(
    persist(
        // 状态与操作方法（persist 的第一个参数）
        (set, get) => ({
            // 主题初始值
            theme:
                typeof window!== 'undefined' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? Theme.DARK
                    : Theme.LIGHT,
            // 切换主题的方法
            toggleTheme: () => {
                const newTheme = get().theme === Theme.LIGHT? Theme.DARK : Theme.LIGHT;
                if (typeof document!== 'undefined') {
                    // 动态添加或移除<html>的 dark 类，实时触发 CSS 中定义的主题样式切换（html.dark）
                    document.documentElement.classList.toggle(
                        Theme.DARK, // 若 newTheme 为 dark，则添加 dark 类；否则，移除 dark 类
                        newTheme === Theme.DARK
                    );
                }
                set({ theme: newTheme });
            }
        }),
        // 持久化配置（persist 的第二个参数）
        {
            name: 'theme', // 本地存储时的键名，状态会被存储在 localStorage.getItem('theme')
            onRehydrateStorage: () => (state) => {
                if (state.theme === Theme.DARK) {
                    document.documentElement.classList.add(Theme.DARK);
                } else {
                    document.documentElement.classList.remove(Theme.DARK);
                }
            }
        }
    )
);