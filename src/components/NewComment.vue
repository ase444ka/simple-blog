<template>
  <form
    class="new-comment-form"
    :class="{ 'new-comment-form_uncorrect': uncorrect }"
    @submit.prevent="send"
  >
    <div class="form-group" :class="{ 'input-empty': !comment.name }">
      <label for="name" class="form-label">Ваше имя</label>
      <input
        class="form-control"
        type="text"
        id="name"
        v-model="comment.name"
      />
    </div>

    <div class="form-group" :class="{ 'input-empty': !comment.text }">
      <label for="text" class="form-label">Текст</label>
      <textarea
        class="form-control"
        id="text"
        v-model="comment.text"
        cols="30"
        rows="5"
      ></textarea>
    </div>
    <div class="new-comment-form__warning" v-if="uncorrect">
      необходимо что-то написать
    </div>
    <button class="button button_red" type="submit">отправить</button>
    <button type="button" class="button button_white" @click="$emit('cancel')">
      отмена
    </button>
  </form>
</template>

<script>
import { formatDate } from '@/assets/utils.js';
export default {
  data() {
    return {
      comment: {
        name: 'гость',
        text: '',
        date: null,
      },
      uncorrect: false,
    };
  },

  methods: {
    send() {
      if (!this.comment.text) {
        this.uncorrect = true;
        return;
      }
      this.comment.date = new Date();
      this.comment.formattedDate = formatDate(this.comment.date);
      this.$emit('change', { ...this.comment });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
.new-comment-form {
  font-style: italic;
  border-radius: 5px;
  padding: 15px 10px;
  &__warning {
    color: $vine;
    margin-bottom: 10px;
  }
  &__button {
    margin-right: 20px;
  }
  * {
    @extend %focus;
  }
}
</style>
