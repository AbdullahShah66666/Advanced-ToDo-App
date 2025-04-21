// tailwind.config.ts
export default {
 darkMode: "class", // this is critical
 content: [
  "./app/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  // etc.
 ],
 theme: {
  extend: {},
 },
 plugins: [],
};
