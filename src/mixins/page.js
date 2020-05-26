// Mixins
import BaseMixin from '@/mixins/base'
import ImagesMixin from '@/mixins/images'

// Data
import pageData from '@/data/page'

// Helpers
import { decode } from '@/helpers/string'
import { getLang } from '@/helpers/lang'

const LANG = getLang()

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
      return [
        { p: 'description', c: decode(this.page.meta.description) },
        // OpenGraph
        { p: 'og:title', c: process.env.VUE_APP_SITE_NAME },
        { p: 'og:site_name', c: process.env.VUE_APP_SITE_NAME },
        { p: 'og:description', c: decode(this.page.meta.description) },
        { p: 'og:image', c: `${process.env.VUE_APP_URL}${this.allImages['seo/push-ups-counter_1200x630'].bind.src}` },
        { p: 'og:image:alt', c: process.env.VUE_APP_SITE_NAME },
        { p: 'og:url', c: process.env.VUE_APP_URL },
        // Twitter
        { p: 'twitter:title', c: process.env.VUE_APP_SITE_NAME },
        { p: 'twitter:description', c: decode(this.page.meta.description) },
        { p: 'twitter:image', c: `${process.env.VUE_APP_URL}${this.allImages['seo/push-ups-counter_900x450'].bind.src}` },
        // Favicon
        { p: 'msapplication-TileColor', c: '#ffffff' },
        { p: 'msapplication-TileImage', c: this.allImages['seo/ms-icon-144x144'].bind.src },
        { p: 'theme-color', c: '#ffffff' },
        { p: 'application-name', c: process.env.VUE_APP_SITE_NAME },
        { p: 'apple-mobile-web-app-title', c: process.env.VUE_APP_SITE_NAME }
      ]
    },

    link: function () {
      return [
        // Splashscreen
        { rel: 'apple-touch-startup-image', href: this.allImages['seo/apple-splashscreen'].bind.src },
        // Favicon
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-57x57'].bind.src, sizes: '57x57' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-60x60'].bind.src, sizes: '60x60' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-72x72'].bind.src, sizes: '72x72' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-76x76'].bind.src, sizes: '76x76' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-114x114'].bind.src, sizes: '114x114' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-120x120'].bind.src, sizes: '120x120' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-120x120'].bind.src, sizes: '128x128' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-144x144'].bind.src, sizes: '144x114' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-152x152'].bind.src, sizes: '152x152' },
        { rel: 'apple-touch-icon', href: this.allImages['seo/apple-icon-180x180'].bind.src, sizes: '180x180' },
        { rel: 'icon', href: this.allImages['seo/android-icon-192x192'].bind.src, sizes: '192x192', type: 'image/png' },
        { rel: 'icon', href: this.allImages['seo/favicon-32x32'].bind.src, sizes: '32x32', type: 'image/png' },
        { rel: 'icon', href: this.allImages['seo/favicon-96x96'].bind.src, sizes: '96x96', type: 'image/png' },
        { rel: 'icon', href: this.allImages['seo/favicon-16x16'].bind.src, sizes: '16x16', type: 'image/png' }
      ]
    }
  },

  beforeMount () {
    document.body.setAttribute('data-page', this.$route.name)
  }
}
