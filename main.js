import './child.js'

function updateContent() {
const $hello = document.querySelector("#hello");
const now = new Date().toLocaleTimeString();
$hello.innerText = `Helloz, it is ${now}\n\n`;
}

updateContent();


if (import.meta.hot) {
  import.meta.hot.accept('./child.js', (newChildModule) => {
    // Replace the child with the updated version, but keep the state intact
    currentChild = newChildModule.Child;
    // You can re-render or update the parent component based on the new child
    render();
  });
}
