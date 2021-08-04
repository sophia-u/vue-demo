const user = {
  state: {
    userInfo: {
      userId: '',
      userName: ''
    }
  },
  mutations: {
    SET_USER_INFO (state, playload) {
      state.userInfo = playload
    }
  },
  actions: {
    setUserInfo (context, playload) {
      context.commit('SET_USER_INFO', playload)
      return context.state
    }
  }
}

export default user
