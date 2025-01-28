
if (import.meta.hot) {
 const timestamp = import.meta.hot.data.timestamp || performance.now();
 console.log(`[HMR] Accepttt for ${import.meta.url} at ${timestamp.toFixed(3)} ms`);

  import.meta.hot.accept((newModule) => {
    if (newModule) {
      const $app = document.querySelector("#app");
      $app.innerText = `Updated at ${timestamp.toFixed(3)} ms\n\n`;
    }

	import.meta.hot.prune();
  });
}
