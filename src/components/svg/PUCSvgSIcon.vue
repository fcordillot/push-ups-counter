<template functional>
 <span class="icon"
       :class="[ `icon--${props.icon}`, props.klass.length > 0 ? [props.klass] : ''  ]">
    <svg>
      <title>{{ props.icon }}</title>

      <use :xlink:href="`/static/icons/icons.svg#icon--${props.icon}`"></use>
    </svg>
  </span>
</template>

<script>
  export default {
    name: 'PUCSvgIcon',

    props: {
      /**
       * Name of the icon
       * @param {String} - *REQUIRED* icon
       **/
      icon: {
        type: String,
        required: true
      },

      /**
       * Additional classes
       * @param {String} - klass
       **/
      klass: {
        type: String,
        default: ''
      }
    }
  }
</script>
