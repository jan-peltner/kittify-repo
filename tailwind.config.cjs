const { readBuilderProgram } = require("typescript")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            bgcol: "#071320",
            hcol: "#EBFAF7",
            pcol: "#14414E",
            btncol: "#91A296",
            stroke: "#050c15",
            main: "#91A296",
            strokehover: "#2f396a",
            grayhover: "#cccccc",
            pinkhover: "#ac7151",
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
