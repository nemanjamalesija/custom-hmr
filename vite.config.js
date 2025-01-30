export default {
  plugins: [{
    name: 'auto-hmr',
    transform(code, id) {



        if (id.endsWith('.js')) {

          return `${code}

          if (import.meta.hot) import.meta.hot.accept()

      `
        }
    }
  }]
}
