import BaseRepository from './baseRepository'

const repositories = {
  base: BaseRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
