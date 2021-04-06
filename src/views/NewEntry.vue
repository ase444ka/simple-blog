<template>
  <form class="new-entry-form" @submit.prevent="send">
    <h2 class="newEntry">
      Новая запись
      <button type="submit" class="badge bg-secondary">сохранить</button>
    </h2>

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
        rows="10"
      />
    </div>
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
      alert('Вы ничего не написали :(');
    },
    send() {
      if (this.notFilledIn) {
        this.abortSending();
        return;
      }
      this.entry.date = new Date();
      localStorage.currentId = this.entry.id;
      this.entries.push(this.entry);
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
