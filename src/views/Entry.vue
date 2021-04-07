<template>
  <div class="entry" v-if="entry">
    <div class="entry__nav" v-if="showEntryNav">
      <a
        v-if="previous"
        @click.prevent="go(previous)"
        class="card-link entry__nav__link entry__nav__link_previous"
        >Предыдущая запись</a
      >
      <a
        v-if="next"
        class="card-link entry__nav__link entry__nav__link_next"
        @click.prevent="go(next)"
        >Следующая запись</a
      >
    </div>
    <h1>{{ entry.title }}</h1>
    <p>{{ entry.text }}</p>

    <entry-comments v-model="localComments" />
  </div>
</template>

<script>
import EntryComments from '@/components/EntryComments.vue';
export default {
  components: { EntryComments },
  data() {
    return {
      entries: JSON.parse(localStorage.entries),
      localComments: [],
    };
  },

  props: {
    id: {
      required: true,
    },
  },
  computed: {
    entry() {
      return this.entries.find((entry) => entry.id == this.$route.params.id);
    },

    showEntryNav() {
      return this.next || this.previous;
    },
    previous() {
      return this.entries
        ? Math.max(
            ...this.entries.map((entry) => {
              return entry.id < this.entry.id ? entry.id : 0;
            }),
          )
        : null;
    },
    next() {
      return this.entries
        ? this.entries.some((entry) => {
            return entry.id > this.entry.id;
          })
          ? Math.min(
              ...this.entries
                .filter((entry) => {
                  return entry.id > this.entry.id;
                })
                .map((entry) => entry.id),
            )
          : null
        : null;
    },
  },
  mounted() {
    this.localComments = this.entry.comments;
  },

  methods: {
    go(id) {
      this.$router.push({ name: 'Entry', params: { id } }).catch((err) => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    },
  },

  watch: {
    localComments(value) {
      let newEntries = this.entries.map((entry) => {
        if (this.id == entry.id) {
          entry.comments = value;
        }
        return entry;
      });
      this.entries = [...newEntries];
      localStorage.entries = JSON.stringify(newEntries);
    },
  },
};
</script>

<style lang="scss" scoped>
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
}

}

</style>
