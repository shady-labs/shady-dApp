import { extendTheme } from "@chakra-ui/react";

const colors = {
  zinc: {
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  accent: {
    main: "#C147E9",
    light: "#E5B8F4",
    transparent: "#810CA8",
  },
};

const fonts = {
  heading: `'Manrope Variable', sans-serif`,
  body: `'Manrope Variable', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

export default theme;
