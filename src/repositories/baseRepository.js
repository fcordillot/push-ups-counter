import Repository from './Repository'

const resource = '/<<EDIT>>'

export default {
  get () {
    return Repository.get(`${resource}`)
  },

  getOne (id) {
    return Repository.get(`${resource}/${id}`)
  }
}
