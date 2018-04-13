export default {
  changeSomething: ({commit}, something) => {
      commit('SOME', something)
  },
  //or
  async changeSomething({commit, state}) {
      let res = await someFunc()
      commit('SOME', res)
  }
}