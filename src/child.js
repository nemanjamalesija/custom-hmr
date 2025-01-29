// if (import.meta.hot) {
//   import.meta.hot.accept((newModule) => {
//       console.log("newModule", newModule);

//     if (newModule) {
//       console.log(`Handling hot relosasasaadsdssdsdsd accept for ${import.meta.url}`);
//       document.querySelector("#app").replaceWith(newModule.Child());
//     }
//   });
// }
// /** @param {HTMLElement} parent */
// export function Child() {
//   const $el = document.createElement("div");
//   $el.id = "child";
//   $el.textContent = `Heldsdsslfsafsafaso my ID is ${(Math.random() * 100).toFixed(0)}`;
//   return $el;
// }

if (import.meta.hot) {
  console.log("IN HERE");
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log(`Handling hot reload accept for ${import.meta.url}`);
      document.querySelector("#child").replaceWith(newModule.Child());
    }
  });
}

/** @param {HTMLElement} parent */
export function Child() {
  const $el = document.createElement("div");
  $el.id = "child";
  $el.textContent = `Hello my ID is ${(Math.random() * 100).toFixed(0)}`;
  return $el;
}
