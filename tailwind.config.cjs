const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [
    require('flowbite/plugin')
  ],

  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {"50":"#000000","100":"#000000","200":"#000000","300":"#000000","400":"#000000","500":"#000000","600":"#000000","700":"#000000","800":"#000000","900":"#000000"}

      }
    }
  }
};

module.exports = config;