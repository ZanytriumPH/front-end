import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 定义主题类型
const Theme = {
    LIGHT: 'light',
    DARK: 'dark'
};

// 创建主题存储
export const useThemeStore = create(
    persist(
        (set, get) => ({
            theme:
                typeof window!== 'undefined' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? Theme.DARK
                    : Theme.LIGHT,
            toggleTheme: () => {
                const newTheme = get().theme === Theme.LIGHT? Theme.DARK : Theme.LIGHT;
                if (typeof document!== 'undefined') {
                    document.documentElement.classList.toggle(
                        Theme.DARK,
                        newTheme === Theme.DARK
                    );
                }
                set({ theme: newTheme });
            }
        }),
        {
            name: 'theme',
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