import { MUTATIONS as M } from '@/store/helpers'

export default {
  methods: {
    sendGtmEvent (eventName, eventVariables) {
      if (eventName && eventName.trim() !== '') {
        console.log({
          ...{
            event: eventName
          },
          ...eventVariables
        })

        window.dataLayer.push({
          ...{
            event: eventName
          },
          ...eventVariables
        })

        console.log(window.dataLayer)

        this.$store.commit(M.sendGtmEvent, eventName)
      }
    }
  }
}
