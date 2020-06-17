const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#F0F7EB",
          150: "#E8F3E0",
          200: "#DAEBCD",
          300: "#C4DFAE",
          400: "#98C872",
          500: "#6CB035",
          600: "#579427",
          700: "#508227",
          800: "#314F18",
          900: "#203510",
        },
        secondary: {
          100: "#E8F3F9",
          150: "#D8E9F2",
          200: "#B0D6EC",
          300: "#86BFDF",
          400: "#5FABD6",
          500: "#1D99E1",
          600: "#1987C2",
          700: "#187BB4",
          750: "#1771A6",
          800: "#156899",
          900: "#08293B",
        },
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
  ],
  corePlugins: {
    float: false,
  },
}
