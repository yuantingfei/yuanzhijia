import Cookies from 'js-cookie';

const app = {
  state: {
    positions:[],
    token: Cookies.get('auth-Token'),
  },
  mutations: {
    SET_ADD_ONE_POSITIONS:(state,position)=>{
      state.positions.push(position)
    },
    SET_REDUCE_ONE_POSITIONS:(state)=>{
      state.positions.pop()
    },
    SET_NEW_POSITIONS:(state,positions)=>{
      state.positions = positions;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
  actions: {
    set_new_positions: ({
      commit
    }, data) => {
      commit('SET_NEW_POSITIONS', data)
    },
    set_add_one_positions: ({
      commit
    }, data) => {
      commit('SET_ADD_ONE_POSITIONS', data)
    },
    set_reduce_one_positions: ({
      commit
    }) => {
      commit('SET_REDUCE_ONE_POSITIONS')
    },
    set_token: ({
      commit
    }) => {
      commit('SET_TOKEN',data)
    },
  }
};

export default app;