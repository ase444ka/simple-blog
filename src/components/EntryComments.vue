<template>
  <div class="entry__comments">
    <h3>Комментарии</h3>
    <transition name="grow">
      <new-comment
        @change="addComment"
        v-if="wantsToComment"
        @cancel="cancelCommenting"
      />
    </transition>
    <button
      type="button"
      class="entry__comments__button btn btn-outline-primary"
      :class="{ entry__comments__button_active: !wantsToComment }"
      @click="allowToComment"
    >
      Оставить комментарий
    </button>
    <transition-group name="grow" tag="ul" v-if="comments.length">
      <li
        v-for="comment of comments"
        :key="comment.id"
        class="entry__comments__comment card"
      >
        <div class="card-body">
          <h5 class="entry__comment__comment-name card-title">
            {{ comment.name }}
          </h5>
          <p class="entry__comments__comment-text card-text">
            {{ comment.text }}
          </p>

          <div class="blockquote-footer">
            Написано {{ comment.formattedDate }}
          </div>
        </div>
        <button
          class="entry__comments__comment__remove badge rounded-pill bg-danger"
          @click="beginRemoving(comment.id)"
        >
          удалить
        </button>
        <transition name="grow">
        <are-you-shure
          v-if="removingId == comment.id"
          @agree="removeComment(comment.id)"
          @cancel="cancelRemoving"
        ></are-you-shure>
        </transition>
      </li>
    </transition-group>
    <div v-else class="entry__comments__empty-warning">
      Здесь пока никто ничего не написал..
    </div>
  </div>
</template>

<script>
import NewComment from './NewComment.vue';
import AreYouShure from './AreYouShure.vue';
export default {
  components: { NewComment, AreYouShure },

  data() {
    return {
      wantsToComment: false,
      removingId: null,
    };
  },

  props: {
    id: {
      required: true,
    },
  },

  computed: {
    comments() {
      return this.$store.state.entries.find((entry) => this.id == entry.id)
        .comments;
    },
  },

  methods: {
    beginRemoving(id) {
      this.removingId = id;
    },
    cancelRemoving() {
      this.removingId = null;
    },
    addComment(event) {
      let comment = event;
      this.$store.commit('addComment', { id: this.id, comment });
      this.wantsToComment = false;
    },
    removeComment(id) {
      this.$store.commit('removeComment', { id: this.id, commentId: id });
      this.removingId = null;
    },
    allowToComment() {
      this.wantsToComment = true;
    },
    cancelCommenting() {
      this.wantsToComment = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.entry__comments {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid lightgray;
  &__comment {
    list-style: none;
    margin: 15px 0;
    &-text {
      font-style: italic;
    }
    &__remove {
      position: absolute;
      top: 5px;
      right: 5px;
      color: white;
    }
  }
  &__button {
    opacity: 0;
    transition: opacity 0.1 ease-in;
    &_active {
      opacity: 1;
    }
  }
  &__empty-warning {
    font-style: italic;
    margin-top: 10px;
  }
}
</style>
