<template>
  <div class="entry__comments">
    <h2>Комментарии</h2>
    <new-comment @change="addComment" />
    <label for="new-comment">Оставить комментарий</label>
    <ul v-if="comments.length">
      <li v-for="comment of comments" :key="comment.id">
        <p class="entry__comment__text">{{ comment.text }}</p>
        <p class="entry__comment__name">{{ comment.name }}</p>
      </li>
    </ul>
    <div v-else>Здесь пока никто ничего не написал..</div>
  </div>
</template>

<script>
let id = 0;

import NewComment from './NewComment.vue';
export default {
  components: { NewComment },

  data() {
    return {
      localComments: this.comments,
    };
  },

  props: {
    comments: {
      type: Array,
      required: true,
    },
  },

  model: {
    event: 'change',
    prop: 'comments',
  },

  methods: {
    addComment(event) {
      let comment = event;
      console.log(id);
      event.id = id++;
      this.localComments.push(comment);
    },
    removeComment(id) {
      let removingComment = this.localComments.find(
        (comment) => (comment.id = id),
      );
      this.localComments.splice(this.localComments.indexOf(removingComment), 1);
    },
  },

  watch: {
    localComments(value) {
      this.$emit('change', value);
    },
  },
};
</script>
