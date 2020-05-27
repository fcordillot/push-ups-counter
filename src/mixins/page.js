// Mixins
import BaseMixin from '@/mixins/base'
import ImagesMixin from '@/mixins/images'

// Store
import { GETTERS as G } from '@/store/helpers'

// Data
import pageData from '@/data/page'

// Helpers
import { decode } from '@/helpers/string'
import { isPrerendering } from '@/helpers/globals'

export default {
  pageName: 'home',

  mixins: [BaseMixin, ImagesMixin],

  computed: {
    page () {
      return pageData(this.$options.pageName)
    },

    meta () {
      return this.page.meta
    },

    content () {
      return this.page.content
    }
  },

  head: {
    title: function () {
      return {
        inner: decode(this.page.meta.title)
      }
    },

    meta: function () {
      const colorScheme = this.$store.getters[G.colorScheme]

      const meta = [
        { p: 'description', c: decode(this.page.meta.description), id: 'description' },
        // OpenGraph
        { p: 'og:title', c: process.env.VUE_APP_SITE_NAME, id: 'og:title' },
        { p: 'og:type', c: 'website', id: 'og:type' },
        { p: 'fb:app_id', c: '', id: 'fb:app_id' },
        { p: 'og:site_name', c: process.env.VUE_APP_SITE_NAME, id: 'og:site_name' },
        { p: 'og:description', c: decode(this.page.meta.description), id: 'og:description' },
        { p: 'og:image', c: `${process.env.VUE_APP_URL}${this.allImages['seo/push-ups-counter_1200x630'].bind.src}`, id: 'og:image' },
        { p: 'og:image:alt', c: process.env.VUE_APP_SITE_NAME, id: 'og:image:alt' },
        { p: 'og:url', c: process.env.VUE_APP_URL, id: 'og:url' },
        // Twitter
        { p: 'twitter:title', c: process.env.VUE_APP_SITE_NAME, id: 'twitter:title' },
        { p: 'twitter:description', c: decode(this.page.meta.description), id: 'twitter:description' },
        { p: 'twitter:image', c: `${process.env.VUE_APP_URL}${this.allImages['seo/push-ups-counter_900x450'].bind.src}`, id: 'twitter:image' },
        { p: 'twitter:card', c: 'summary_large_image', id: 'twitter:card' },
        { p: 'twitter:creator', c: '@fcordillot', id: 'twitter:creator' },
        // Favicon
        { p: 'msapplication-TileColor', c: colorScheme === 'light' ? '#0e0e0e' : '#ffffff', id: 'msapplication-TileColor' },
        { p: 'msapplication-TileImage', c: this.allImages['seo/ms-icon-144x144'].bind.src, id: 'msapplication-TileImage' },
        { p: 'theme-color', c: colorScheme === 'light' ? '#0e0e0e' : '#ffffff', id: 'theme-color' },
        { p: 'msapplication-navbutton-color', c: colorScheme === 'light' ? '#0e0e0e' : '#ffffff', id: 'msapplication-navbutton-color' },
        { p: 'application-name', c: process.env.VUE_APP_SITE_NAME, id: 'application-name' },
        { p: 'apple-mobile-web-app-title', c: process.env.VUE_APP_SITE_NAME, id: 'apple-mobile-web-app-title' },
        // PWA
        { rel: 'mobile-web-app-capable', c: 'yes', id: 'mobile-web-app-capable' },
        { rel: 'apple-mobile-web-app-capable', c: 'yes', id: 'apple-mobile-web-app-capable' },
        { rel: 'msapplication-starturl', c: '/', id: 'msapplication-starturl' }
      ]

      if (!isPrerendering) {
        meta.push({ n: 'apple-mobile-web-app-status-bar-style', c: colorScheme === 'light' ? 'default' : 'black-translucent', id: 'apple-mobile-web-app-status-bar-style' })
      }

      return meta
    },

    link: function () {
      return [
        // Splashscreen
        { rel: 'apple-touch-startup-image', href: this.allImages['seo/apple-splashscreen'].bind.src, id: 'apple-touch-startup-image' },
        // Favicon
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-57x57'].bind.src, sizes: '57x57', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-60x60'].bind.src, sizes: '60x60', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-72x72'].bind.src, sizes: '72x72', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-76x76'].bind.src, sizes: '76x76', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-114x114'].bind.src, sizes: '114x114', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-120x120'].bind.src, sizes: '120x120', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-120x120'].bind.src, sizes: '128x128', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-144x144'].bind.src, sizes: '144x114', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-152x152'].bind.src, sizes: '152x152', id: 'apple-touch-icon' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-180x180'].bind.src, sizes: '180x180', id: 'apple-touch-icon' },
        { rel: 'icon', href: this.allImages['seo/android-icon-192x192'].bind.src, sizes: '192x192', type: 'image/png', id: 'icon' },
        { rel: 'icon', href: this.allImages['seo/favicon-32x32'].bind.src, sizes: '32x32', type: 'image/png', id: 'icon' },
        { rel: 'icon', href: this.allImages['seo/favicon-96x96'].bind.src, sizes: '96x96', type: 'image/png', id: 'icon' },
        { rel: 'icon', href: this.allImages['seo/favicon-16x16'].bind.src, sizes: '16x16', type: 'image/png', id: 'icon' }
      ]
    }
  },

  beforeMount () {
    document.body.setAttribute('data-page', this.$route.name)
  }
}
