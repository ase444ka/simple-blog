<template>
  <div class="home">
    <transition-group name="grow" tag="ul" v-if="$store.state.entries.length">
      <li v-for="entry of reversedEntries" :key="entry.id" class="card">
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
import AreYouShure from '@/components/AreYouShure.vue';
export default {
  components: { AreYouShure },
  data() {
    return {
      removingId: null,
    };
  },
  methods: {
    removeEntry(entry) {
      let id = entry.id;
      this.$store.commit('remove', id)
    },
    beginRemoving(entry) {
      this.removingId = entry.id;
    },
    cancelRemoving() {
      this.removingId = null;
    },
  },
  computed: {
    reversedEntries() {
      return this.$store.state.entries.slice().reverse();
    }
  }

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
