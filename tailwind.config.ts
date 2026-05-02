import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        muted: "#5b6676",
        paper: "#f8fbff",
        line: "#dbe7f3",
        ocean: "#0f766e",
        theorem: "#1d4ed8",
        amber: "#b7791f",
        proof: "#b4233a"
      },
      boxShadow: {
        panel: "0 18px 48px rgba(17, 24, 39, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
