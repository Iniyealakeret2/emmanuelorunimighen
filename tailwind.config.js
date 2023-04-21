/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    // height: {
    //   "h-0": "0px",
    //   "h-px": "1px",
    //   "h-0.5": "0.125rem" /* 2px */,
    //   "h-1": "0.25rem" /* 4px */,
    //   "h-1.5": "0.375rem" /* 6px */,
    //   "h-2": "0.5rem" /* 8px */,
    //   "h-2.5": "0.625rem" /* 10px */,
    //   "h-3": "0.75rem" /* 12px */,
    //   "h-3.5": "0.875rem" /* 14px */,
    //   "h-4": "1rem" /* 16px */,
    //   "h-5": "1.25rem" /* 20px */,
    //   "h-6": "1.5rem" /* 24px */,
    //   "h-7": "1.75rem" /* 28px */,
    //   "h-8": "2rem" /* 32px */,
    //   "h-9": "2.25rem" /* 36px */,
    //   "h-10": "2.5rem" /* 40px */,
    //   "h-11": "2.75rem" /* 44px */,
    //   "h-12": "3rem" /* 48px */,
    //   "h-14": "3.5rem" /* 56px */,
    //   "h-16": "4rem" /* 64px */,
    //   "h-18": "4.5rem" /* 72px */,
    //   "h-20": "5rem" /* 80px */,
    //   "h-24": "6rem" /* 96px */,
    //   "h-28": "7rem" /* 112px */,
    //   "h-32": "8rem" /* 128px */,
    //   "h-36": "9rem" /* 144px */,
    //   "h-40": "10rem" /* 160px */,
    //   "h-44": "11rem" /* 176px */,
    //   "h-48": "12rem" /* 192px */,
    //   "h-52": "13rem" /* 208px */,
    //   "h-56": "14rem" /* 224px */,
    //   "h-60": "15rem" /* 240px */,
    //   "h-64": "16rem" /* 256px */,
    //   "h-72": "18rem" /* 288px */,
    //   "h-80": "20rem" /* 320px */,
    //   "h-96": "24rem" /* 384px */,
    //   "h-auto": "auto",
    //   "h-1/2": "50%",
    //   "h-1/3": "33.333333%",
    //   "h-2/3": "66.666667%",
    //   "h-1/4": "25%",
    //   "h-2/4": "50%",
    //   "h-3/4": "75%",
    //   "h-1/5": "20%",
    //   "h-2/5": "40%",
    //   "h-3/5": "60%",
    //   "h-4/5": "80%",
    //   "h-1/6": "16.666667%",
    //   "h-2/6": "33.333333%",
    //   "h-3/6": "50%",
    //   "h-4/6": "66.666667%",
    //   "h-5/6": "83.333333%",
    //   "h-full": "100%",
    //   "h-screen": "100vh",
    //   "h-min": "min-content",
    //   "h-max": "max-content",
    //   "h-fit": "fit-content",
    // },
    fontFamily: {
      mont: ["Montserrat", "sans-serif"],
    },
    colors: {
      // primary: "#d97706",
      // secondary: "#0e0f10",
      primary: {
        1: "#060606",
        2: "#FFF",
        3: "#020202",
        4: "#14141b",
        5: "#000000",
      },
      body: "#6A7185",
      secondary: {
        1: "#f4b060",
        2: "#232a31",
        3: "#2E3235",
        4: "#141418",
        5: "#A4A4A4",
        6: "#F8FDF8",
        7: "#0e0f10",
        8: "#f4b06014",
      },
    },
    extend: {
      mi: {
        "3/5": "600px",
      },
    },
  },
  plugins: [],
};
