import Vue from 'vue';
import Vuex from 'vuex';
import { formatDate } from '@/assets/utils.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    entries: localStorage.entries ? JSON.parse(localStorage.entries) : [],
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
        commentId: 1,
      });
      localStorage.entries = JSON.stringify(state.entries);
    },
    remove(state, id) {
      let removingEntry = state.entries.find((entry) => entry.id == id);
      state.entries.splice(state.entries.indexOf(removingEntry), 1);
      localStorage.entries = JSON.stringify(state.entries) || '';
    },
    addComment(state, { id, comment }) {
      let updatingEntry = state.entries.find((entry) => entry.id == id);
      let ipdatingIndex = state.entries.indexOf(updatingEntry);
      updatingEntry.comments.push({ ...comment, id: updatingEntry.commentId });
      updatingEntry.commentId++;
      state.entries.splice(ipdatingIndex, 1, updatingEntry);
      localStorage.entries = JSON.stringify(state.entries);
    },
    removeComment(state, { id, commentId }) {
      let updatingEntry = state.entries.find((entry) => entry.id == id);
      let ipdatingIndex = state.entries.indexOf(updatingEntry);
      let removingComment = updatingEntry.comments.find(
        (comment) => comment.id == commentId,
      );
      let removingIndex = updatingEntry.comments.indexOf(removingComment);

      updatingEntry.comments.splice(removingIndex, 1);
      state.entries.splice(ipdatingIndex, 1, updatingEntry);
      localStorage.entries = JSON.stringify(state.entries);
    },
  },
});

export default store;
