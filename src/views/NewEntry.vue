<template>
  <form class="new-entry-form" @submit.prevent="send">
    <h2 class="new-entry-form__header">Новая запись</h2>
    <div class="form-group" :class="{ 'input-empty': !entry.title }">
      <label class="form-label" for="title">Название</label>
      <input
        class="form-control"
        type="text"
        id="title"
        v-model="entry.title"
      />
    </div>

    <div class="form-group" :class="{ 'input-empty': !entry.about }">
      <label class="form-label" for="about">Краткое описание</label>
      <textarea
        class="form-control"
        type="text"
        id="about"
        v-model="entry.about"
        cols="40"
        rows="2"
      />
    </div>

    <div class="form-group" :class="{ 'input-empty': !entry.text }">
      <label class="form-label" for="text">Текст</label>
      <textarea
        class="form-control"
        id="text"
        v-model="entry.text"
        cols="40"
        rows="5"
      />
    </div>
    <div class="new-entry-form__warning" v-if="showWarning">
      необходимо что-то написать
    </div>
    <button type="submit" class="button button_red">сохранить</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      entry: {
        text: '',
        about: '',
        title: '',
      },
      showWarning: false,
    };
  },
  methods: {
    abortSending() {
      this.showWarning = true;
    },
    send() {
      if (this.notFilledIn) {
        this.abortSending();
        return;
      }
      this.$store.commit('add', this.entry);
      this.$router.push({ name: 'Success' });
    },
  },

  computed: {
    notFilledIn() {
      return !this.entry.text || !this.entry.about || !this.entry.title;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
.new-entry-form {
  width: 90%;
  margin: 10px auto;
  min-height: 1000px;
  &__warning {
    color: $vine;
    font-size: 1.5rem;
    padding: 5px;
  }
}
.form-control {
  @extend %focus;
}
</style>
