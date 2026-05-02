import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        muted: "#5f6f68",
        paper: "#f6f7f1",
        line: "#d8dfd5",
        ocean: "#146f6b",
        theorem: "#315fb8",
        amber: "#a95f17",
        proof: "#9b3f3b"
      },
      boxShadow: {
        panel: "0 18px 48px rgba(23, 33, 31, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
