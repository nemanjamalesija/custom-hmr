import { Child, incrementHandler, count } from './child.js';

const { incrementButton } = Child();

if (import.meta.hot) {
	import.meta.hot.accept();
	import.meta.hot.accept('./child.js', (newModule) => {
		// Preserve the count value
		const prevCount = count;

		import.meta.hot.dispose(() => {
			incrementButton.removeEventListener("click", incrementHandler);
		});

		// Restore the count value
		newModule.setCount(prevCount);
	});
}
