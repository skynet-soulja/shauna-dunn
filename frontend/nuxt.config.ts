// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  strapi: {
    devtools: true,
  },
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})
