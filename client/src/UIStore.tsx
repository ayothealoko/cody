import { Store } from "pullstate";

export const UIStore = new Store({
  isDarkMode: true,

  filetypes: {
    programmingLanguages: [".js", ".jsx", ".ts", ".tsx"],
    stylingLanguages: [".css", ".scss"],
    images: [".gif", ".png", ".jpeg", ".svg"],
    fonts: [".eot", ".woff", ".woff2", ".otf", ".ttf"],
  },

  selectedFileType: [],
});
