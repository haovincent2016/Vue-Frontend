import { SOME } from './mutation-types'

export default {
  [SOME](state, value) {
    state.something = value
  }
}