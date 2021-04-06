<template>
  <div class="home">
    <transition-group name="grow" tag="ul" v-if="localEntries.length">
      <li v-for="entry of localEntries" :key="entry.id" class="card">
        <div class="card-body">
          <h3 class="card-title">{{ entry.title }}</h3>
          <p class="card-text">{{ entry.about }}</p>
          <div class="blockquote-footer">
            Написано {{ entry.formattedDate }}
          </div>
          <div class="card__comments">
            Комментариев: {{ entry.comments.length }}
          </div>
          <router-link
            :to="{ name: 'Entry', params: { id: entry.id } }"
            class="card-link"
            >Читать далее</router-link
          >
          <button
            class="badge rounded-pill bg-danger card__remove"
            @click="beginRemoving(entry)"
          >
            удалить запись
          </button>
          <are-you-shure
            v-if="removingId == entry.id"
            @agree="removeEntry(entry)"
            @cancel="cancelRemoving"
          ></are-you-shure>
        </div>
      </li>
    </transition-group>
    <div v-else>Пока мой блог пустой...</div>
  </div>
</template>
<script>
import { formatDate } from '@/assets/utils.js';
import AreYouShure from '@/components/AreYouShure.vue';
export default {
  components: { AreYouShure },
  data() {
    return {
      entries: JSON.parse(localStorage.entries),
      removingId: null,
    };
  },
  methods: {
    removeEntry(entry) {
      let remainingEntries = this.entries.filter(
        (current) => current.id != entry.id,
      );
      this.entries = remainingEntries;
    },
    beginRemoving(entry) {
      this.removingId = entry.id;
    },
    cancelRemoving() {
      this.removingId = null;
    },
  },
  watch: {
    entries(value) {
      localStorage.entries = JSON.stringify(value);
    },
  },

  computed: {
    localEntries() {
      return this.entries
        .map((entry) => ({
          ...entry,
          formattedDate: formatDate(entry.date),
        }))
        .reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  &__comments {
    font-style: italic;
    margin-top: 15px;
    margin-bottom: 18px;
  }
  &-text {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    padding-bottom: 10px;
  }
  &__remove {
    position: absolute;
    top: 5px;
    right: 5px;
    color: white;
  }
}
</style>
