import { shikiPlugin } from '@vuepress/plugin-shiki'

export default {
    plugins: [
        shikiPlugin({
            // 配置项
            langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff'],
        }),
    ],
}