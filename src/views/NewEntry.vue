<template>
  <form class="new-entry-form" @submit.prevent="send">
    <h1 class="newEntry">new Entry</h1>
    <div class="form-group" :class="{ 'input-empty': !entry.title }">
      <label class="form-group__label" for="title">Название</label>
      <input
        class="form-group__input"
        type="text"
        id="title"
        v-model="entry.title"
      />
    </div>

    <div class="form-group" :class="{ 'input-empty': !entry.about }">
      <label class="form-group__label" for="about">Краткое описание</label>
      <input
        class="form-group__input"
        type="text"
        id="about"
        v-model="entry.about"
      />
    </div>

    <div class="form-group" :class="{ 'input-empty': !entry.text }">
      <label class="form-group__label" for="text">Текст</label>
      <textarea
        class="form-group__input"
        id="text"
        v-model="entry.text"
        cols="100"
        rows="500"
      ></textarea>
    </div>
    <button type="submit">send</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      entries: localStorage.entries ? JSON.parse(localStorage.entries) : [],

      entry: {
        id: +localStorage.currentId + 1 || 1,
        text: '',
        about: '',
        date: null,
        title: '',
        comments: [],
      },
    };
  },
  methods: {
    abortSending() {
      alert('not filled');
    },
    send() {
      if (this.notFilledIn) {
        this.abortSending();
        return;
      }
      this.entry.date = new Date();
      localStorage.currentId = this.entry.id;
      this.entries.push(this.entry);
      console.log(this.entry);
      console.log(this.entries);
      localStorage.entries = JSON.stringify(this.entries);
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

<style scoped lang="scss">
.form-group {
  &__input {
    padding: 12px 16px;
    height: 52px;
    border-radius: 8px;
    border: 2px solid lightblue;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: blue;
    transition: 0.2s all;
    background-color: white;
    outline: none;
    box-shadow: none;
  }
  &__label {
    display: block;
  }
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px 15px;
  margin-bottom: 24px;
  background: lightskyblue;
  &.input-empty {
    border-color: red;
    background: lightpink;
  }
}
</style>
