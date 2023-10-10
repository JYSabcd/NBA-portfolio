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
        // primary: {"50":"#000000","100":"#000000","200":"#000000","300":"#000000","400":"#000000","500":"#000000","600":"#000000","700":"#000000","800":"#000000","900":"#000000"}
        primary: {"50":"#F9FAFB","100":"#F3F4F6","200":"#E5E7EB","300":"#D1D5DB","400":"#9CA3AF","500":"#6B7280","600":"#4B5563","700":"#000000","800":"#1F2937","900":"#111827"}
        //primary: {"50":"#F9FAFB","100":"#F3F4F6","200":"#E5E7EB","300":"#D1D5DB","400":"#9CA3AF","500":"#6B7280","600":"#4B5563","700":"#374151","800":"#1F2937","900":"#111827"}
      }
    }
  }
};

module.exports = config;