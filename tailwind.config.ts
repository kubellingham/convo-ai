import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { ink: "#14213D", mint: "#DDF8EB", coral: "#FF6B5F" } } }, plugins: [] };
export default config;
