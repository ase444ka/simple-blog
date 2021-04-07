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
        :class="{ entry__nav__link_disabled: !previous }"
        :to="{ name: 'Entry', params: { id: previous } }"
        class="card-link entry__nav__link entry__nav__link_previous"
        >Предыдущая запись</router-link
      >
      <router-link
        :class="{ entry__nav__link_disabled: !next }"
        class="card-link entry__nav__link entry__nav__link_next"
        :to="{ name: 'Entry', params: { id: next } }"
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
      return this.$store.state.entries
        ? Math.max(
            ...this.$store.state.entries.map((entry) => {
              return entry.id < this.$route.params.id ? entry.id : 0;
            }),
          )
        : null;
    },
    next() {
      return this.$store.state.entries.some((entry) => {
        return entry.id > this.$route.params.id;
      })
        ? Math.min(
            ...this.$store.state.entries
              .filter((entry) => {
                return entry.id > this.$route.params.id;
              })
              .map((entry) => entry.id),
          )
        : null;
    },
  },
};
</script>

<style lang="scss">
#nav {
  margin-bottom: 20px;
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.entry__nav {
  display: grid;
  grid-template-columns: 300px 300px;
  &__link {
    display: block;
    cursor: pointer;
    &_previous {
      grid-area: 1 / 1 / 2 / 2;
    }
    &_next {
      grid-area: 1 / 2 / 2 / 3;
    }
    &_disabled {
      color: lightgray;
      cursor: default;
      &:hover {
        color: lightgray;
      cursor: default;
      }
    }
  }
}
</style>
