import { createStyled } from "@stitches/react";
import { CSSProperties } from "react";

export const { styled, css } = createStyled({
  prefix: "",
  tokens: {
    colors: {
      $bg: "white",
      $bg2: "#f2f4f5",
      $gray500: "hsl(206,10%,76%)",
      $blue500: "hsl(206,100%,50%)",
      $purple500: "hsl(252,78%,60%)",
      $green500: "hsl(148,60%,60%)",
      $red500: "hsl(352,100%,62%)",
    },
    height: {
      $0: "0",
      $1: "0.25rem",
      $2: "0.5rem",
      $3: "0.75rem",
      $4: "1rem",
      $5: "1.25rem",
      $6: "1.5rem",
      $7: "1.75rem",
      $8: "2rem",
    },
    space: {
      $1: "5px",
      $2: "10px",
      $3: "15px",
      autoX: "0 auto",
    },
    fontSizes: {
      $xs: "0.75rem",
      $sm: "0.875rem",
      $base: "1rem",
      $lg: "1.125rem",
      $xl: "1.25rem",
      $2xl: "1.5rem",
      $3xl: "1.875rem",
      $4xl: "2.25rem",
      $5xl: "3rem",
      $6xl: "4rem",
    },
    fonts: {
      $untitled: "Untitled Sans, apple-system, sans-serif",
      $mono: "Söhne Mono, menlo, monospace",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  breakpoints: {
    sm: (rule) => `@media (min-width: 640px) { ${rule} }`,
    md: (rule) => `@media (min-width: 768px) { ${rule} }`,
    lg: (rule) => `@media (min-width: 1024px) { ${rule} }`,
    xl: (rule) => `@media (min-width: 1280px) { ${rule} }`,
  },
  utils: {
    m: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (config) => (value) => ({
      marginTop: value,
    }),
    mr: (config) => (value) => ({
      marginRight: value,
    }),
    mb: (config) => (value) => ({
      marginBottom: value,
    }),
    ml: (config) => (value) => ({
      marginLeft: value,
    }),
    mx: (config) => (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (config) => (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: (config) => (value) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (config) => (value) => ({
      paddingTop: value,
    }),
    pr: (config) => (value) => ({
      paddingRight: value,
    }),
    pb: (config) => (value) => ({
      paddingBottom: value,
    }),
    pl: (config) => (value) => ({
      paddingLeft: value,
    }),
    px: (config) => (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (config) => (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    size: (config) => (value) => ({
      width: value,
      height: value,
    }),
    linearGradient: (config) => (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),
    br: (config) => (value) => ({
      borderRadius: value,
    }),
    flexBetweenCenter: (config) => (value: CSSProperties["flexDirection"] = "row") => ({
      flexDirection: value,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
    flexCenterCenter: (config) => (value: CSSProperties["flexDirection"] = "row") => ({
      flexDirection: value,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
  },
});
