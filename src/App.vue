<template>
  <div id="app">
    <h1>Мой простой блог</h1>
    <div id="nav">
      <router-link to="/" v-if="showHome" class="btn btn-outline-primary"
        >На главную</router-link
      >
      <router-link
        to="/new-entry/"
        v-if="showNewEntry"
        class="btn btn-outline-primary"
        >Новая запись</router-link
      >
    </div>
    <div class="entry__nav" v-if="showEntryNav">
      <router-link
        v-if="previous"
        :to="{ name: 'Entry', params: { id: previous } }"
        class="card-link"
        >Предыдущая запись</router-link
      >
      <router-link
        v-if="next"
        :to="{ name: 'Entry', params: { id: next } }"
        class="card-link"
        >Следующая запись</router-link
      >
    </div>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      entries: JSON.parse(localStorage.entries) || [],
    };
  },
  computed: {
    showHome() {
      return this.$route.name != 'Home';
    },
    showNewEntry() {
      return this.$route.name != 'NewEntry';
    },
    showEntryNav() {
      return this.$route.name == 'Entry';
    },
    previous() {
      return this.entries
        ? Math.max(
            ...this.entries.map((entry) => {
              return entry.id < this.$route.params.id ? entry.id : 0;
            }),
          )
        : null;
    },
    next() {
      return this.entries
        ? this.entries.some((entry) => {
            return entry.id > this.$route.params.id;
          })
          ? Math.min(
              ...this.entries
                .filter((entry) => {
                  return entry.id > this.$route.params.id;
                })
                .map((entry) => entry.id),
            )
          : null
        : null;
    },
  },
  watch: {
    localStorage(value) {
      this.entries = JSON.parse(value);
    }
  }
};
</script>

<style>
#nav {
  margin-bottom: 20px;
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
