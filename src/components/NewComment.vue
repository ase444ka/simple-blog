<template>
  <form
    class="new-comment-form"
    :class="{ 'new-comment-form_uncorrect': uncorrect }"
    @submit.prevent="send"
  >
    <div class="form-group" :class="{ 'input-empty': !comment.name }">
      <label for="name">Ваше имя</label>
      <input type="text" id="name" v-model="comment.name" />
    </div>

    <div class="form-group" :class="{ 'input-empty': !comment.text }">
      <label for="text">Текст</label>
      <textarea id="text" v-model="comment.text" cols="30" rows="10"></textarea>
    </div>
    <span class="new-comment-form__warning" v-if="uncorrect"
      >необходимо что-то написать</span
    >
    <button type="submit">отправить</button>
  </form>
</template>

<script>
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
      this.$emit('change', { ...this.comment });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-comment-form {
  border: 1px solid blue;
  background: lightsteelblue;
  padding: 10px 5px;
  width: 40%;
  &__warning {
    color: darkred;
  }
}
</style>
