export let count = import.meta.hot?.data?.count ?? 0; // Restore count if it exists

const incrementButton = document.querySelector("#increment");
const countElement = document.querySelector("#count");
const childElement = document.querySelector("#child");
countElement.textContent = count;


incrementButton.addEventListener("click", () => {
  count += 1;
  countElement.textContent = count;
});

if (import.meta.hot) {
  import.meta.hot.data.count = count;

  import.meta.hot.dispose((data) => {
    data.count = count;
    childElement.innerHTML = `${Math.random()}`

  });

  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log(`Handling HMR for: ${import.meta.url}`);
    }
  });
}
