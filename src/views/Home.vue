<template>
  <div class="home">
    <h1>Мой простой блог</h1>
    <ul v-if="entries">
      <li v-for="entry of entries" :key="entry.id">
        <h3>{{ entry.title }}</h3>
        <p>{{ entry.about }}</p>
        <div>Написано {{ new Date(entry.date).toString() }}</div>
        <div>Комментариев: {{ entry.comments.length }}</div>
        <router-link :to="{ name: 'Entry', params: { id: entry.id } }"
          >Читать далее</router-link
        >
        <button @click="removeEntry(entry)">удалить запись</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      entries: JSON.parse(localStorage.entries),
    };
  },
  methods: {
    removeEntry(entry) {
      let remainingEntries = this.entries.filter(
        (current) => current.id != entry.id,
      );
      this.entries = remainingEntries;
    },
  },
  watch: {
    entries(value) {
      localStorage.entries = JSON.stringify(value);
    },
  },
};
</script>
