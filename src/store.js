import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    roleId:"report",
    galleryId:"1-1-2",
    situation_title:"56",
    eventAnalysisPop:false,
    positions:[],
    situation_nav_hidden:true,
  },
  getters:{
    getSituationTitle:state => {
      return state.situation_title
    },
    positions:state=> state.positions,
    situation_nav_hidden:state => state.situation_nav_hidden 
    
  },
  mutations: {
    changeRoleId(state, roleId) {
      state.roleId = roleId;
    },
    changeGalleryId(state, id) {
      state.galleryId = id;
    },
    changeEvtPop(state,flag){
      state.eventAnalysisPop = flag
    },
    changeSituationTitle(state, title) {
      state.situation_title = title;
    },
    SET_ADD_ONE_POSITIONS:(state,position)=>{
      state.positions.push(position)
    },
    SET_REDUCE_ONE_POSITIONS:(state)=>{
      state.positions.pop()
    },
    SET_NEW_POSITIONS:(state,positions)=>{
      state.positions = positions;
    },
    switch_situation_nav_hidden(state, value) {
      state.situation_nav_hidden = value;
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
    switch_situation_nav_hidden: ({
      commit
    }, data) => {
      commit('switch_situation_nav_hidden', data)
    },
  }
});
