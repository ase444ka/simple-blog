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
    <button class="btn btn-primary new-comment-form__button" type="submit">
      отправить
    </button>
    <button
      type="button"
      class="btn btn-secondary new-comment-form__button"
      @click="$emit('cancel')"
    >
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
.new-comment-form {
  font-style: italic;
  border: 1px solid rgba(176, 196, 222, 0.8);
  border-radius: 5px;
  background: rgba(176, 196, 222, 0.2);
  padding: 15px 10px;
  width: 40%;
  &__warning {
    color: darkred;
    margin-bottom: 10px;
  }
  &__button {
    margin-right: 20px;
  }
}
</style>
