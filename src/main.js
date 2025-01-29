import { Child } from "./child.js";

  if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
      console.log("newModule", newModule);
      if (newModule) {
        const $app = document.querySelector("#app");
        const now = new Date().toLocaleTimeString();
        $app.innerText = `Hello, it is ${now}\n\n`;

        $app.appendChild(Child());
      }
    });
  }


