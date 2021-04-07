import Vue from 'vue';
import Vuex from 'vuex';
import { formatDate } from '@/assets/utils.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    entries: localStorage.entries? JSON.parse(localStorage.entries) : [],
    lastId: localStorage.lastId || 1,
  },
  mutations: {
    add(state, entry) {
        state.lastId++;
        localStorage.lastId = state.lastId;
      state.entries.push({
        ...entry,
        id: state.lastId,
        date: new Date(),
        comments: [],
        formattedDate: formatDate(new Date()),
      });
      localStorage.entries = JSON.stringify(state.entries);
    },
    remove(state, id) {
      let removingEntry = state.entries.find((entry) => entry.id == id);
      state.entries.splice(state.entries.indexOf(removingEntry), 1);
      localStorage.entries = JSON.stringify(state.entries);
    },
    updateComments(state, { id, comments }) {
      let updatingEntry = state.entries.find((entry) => entry.id == id)
        .comments;
      updatingEntry.comments = comments.slice();
      localStorage.entries = JSON.stringify(state.entries);
    },
  },
});

export default store;
