  import { Child } from './child.js'

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log(`Handling hot sdssreload accept dsadsadsadsa ${import.meta.url}`);
      const $app = document.querySelector("#app");
  	  const now = new Date().toLocaleTimeString();
  	  $app.innerText = `Hello, dsadsssdsadsasdasdasdasda is ${now}\n\n`;
  	  $app.appendChild(Child());

    }
  });
}


