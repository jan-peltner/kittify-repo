const { readBuilderProgram } = require("typescript")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            bgcol: "#232946",
            hcol: "#fffffe",
            pcol: "#b8c1ec",
            btncol: "#eebbc3",
            stroke: "#121629",
            main: "#b8c1ec",
            strokehover: "#2f396a",
            grayhover: "#cccccc",
            pinkhover: "#e699a4",
        },
        fontFamily: {
            serif: ["Open Sans", "sans-serif"],
            cursive: ["Dancing Script", "cursive"],
        },
        extend: {
            borderWidth: {
                3: "3px",
            },
            gridAutoRows: {
                360: "360px",
            },
        },
    },
    plugins: [],
}
