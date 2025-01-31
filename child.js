export let count;
const incrementButton = document.querySelector("#increment");
const countElement = document.querySelector("#count");


setCount(0);

export function setCount(newCount) {
  count = newCount;
  countElement.textContent = count;

}
export function incrementHandler() {
  count += 1;
  countElement.textContent = count;
}

export function Child() {

  incrementButton.addEventListener("click", incrementHandler);

  return { incrementButton, countElement }
}



// if (import.meta.hot) {
//   import.meta.hot.data.count = count;

//   import.meta.hot.dispose((data) => {
//     data.count = count;

//   });

//   import.meta.hot.accept((newModule) => {
//     if (newModule) {
//       console.log(`Handling HMR for: ${import.meta.url}`);
//     }
//   });
// }
