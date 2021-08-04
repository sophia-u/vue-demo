const info = {
  state: {
    infoList: []
  },
  mutations: {
    SET_INFO_LIST (state, playload) {
      state.infoList = playload
    }
  },
  actions: {
    setInfoList (context, playload) {
      context.commit('SET_INFO_LIST', playload)
      return context.state
    }
  }
}

export default info
