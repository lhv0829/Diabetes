/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        'node_modules/preline/dist/*.js',
        'node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
        'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class',
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '1025px',
            xl: '1280px',
            xl2: '1360px',
        },
        extend: {},
    },
    plugins: [require('daisyui'), require('preline/plugin'), require("@material-tailwind/react/utils/withMT")],
    daisyui: {
        styled: true,
        themes: ['emerald', 'dark', 'forest', 'synthwave'],
        base: true,
        utils: true,
        logs: true,
        rtl: false
    },
}

