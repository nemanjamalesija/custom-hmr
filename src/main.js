import './child.js'

  if (import.meta.hot) {
      import.meta.hot.dispose((data) => {
  })

    import.meta.hot.accept((newModule) => {
      console.log("newModule", newModule);
      if (newModule) {
        const $hello = document.querySelector("#hello");
        const now = new Date().toLocaleTimeString();
        $hello.innerText = `Hello, it is ${now}\n\n`;
      }
    });
  }


