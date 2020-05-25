import { browserSpecs } from '@/helpers/globals'

export default {
  data () {
    return {
      edge16: browserSpecs.name === 'Edge' && browserSpecs.version === '16',
      edge17: browserSpecs.name === 'Edge' && browserSpecs.version === '17'
    }
  }
}
