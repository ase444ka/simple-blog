<template>
  <div class="blog__articles">
    <h3
      class="blog__articles__header"
      v-if="reversedEntries && reversedEntries.length"
    >
      Последние записи
    </h3>
    <transition-group
      name="grow"
      tag="ul"
      class="content"
      v-if="reversedEntries && reversedEntries.length"
    >
      <li
        v-for="entry of reversedEntries"
        :key="entry.id"
        class="blog__articles__article"
      >
        <router-link :to="{ name: 'Entry', params: { id: entry.id } }"
          ><h3 class="blog__articles__article__header">
            {{ entry.title }}
          </h3></router-link
        >
        <div class="blog__articles__article__info">
          <span>Написано {{ entry.formattedDate }}</span>
          /
          <router-link
            :to="{
              name: 'Entry',
              params: { id: entry.id },
              hash: '#comments',
            }"
            >Комментариев: {{ entry.comments.length }}</router-link
          >
        </div>
        <p class="blog__articles__article__text">{{ entry.about }}</p>

        <router-link
          :to="{ name: 'Entry', params: { id: entry.id } }"
          class="blog__articles__article__link button button_red"
          >Читать далее</router-link
        >
        <button
          class="blog__articles__article__remove-button button button_white"
          @click="beginRemoving(entry)"
        >
          удалить запись
        </button>
        <transition name="grow">
          <are-you-shure
            v-if="removingId == entry.id"
            @agree="removeEntry(entry)"
            @cancel="cancelRemoving"
          ></are-you-shure>
        </transition>
      </li>
    </transition-group>
    <div v-else class="blog_empty">Пока мой блог пустой...</div>
  </div>
</template>
<script>
import AreYouShure from '@/components/AreYouShure.vue';
import { formatDate } from '@/assets/utils.js';

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
      this.$store.commit('remove', id);
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
      return this.$store.state.entries
        .slice()
        .reverse()
        .map((entry) =>
          Object.assign({}, entry, { formattedDate: formatDate(entry.date) }),
        );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
.blog_empty {
  @extend %width;
  min-height: 1000px;
}
.blog__articles {
  a:hover {
    text-decoration: none;
  }
  &__header {
    font-family: Raleway;
    text-transform: uppercase;
    display: flex;
    font-size: 1.3rem;
    flex-direction: column;
    align-items: center;
    color: #333333;

    &::after {
      content: '';
      width: 50px;
      margin: 35px auto;
      height: 1px;
      background: rgba(51, 51, 51, 0.2);
    }
  }
  &__article {
    font-family: 'PT Serif';

    list-style: none;
    &__header {
      @extend %header;
      &:hover {
        color: $vine;
      }
    }
    &__text {
      margin: 35px auto;
    }
    &__info {
      color: #888888;
      font-size: 0.8rem;
      a {
        color: #888888;
        font-size: 0.8rem;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &::after {
      content: '';
      width: 50px;
      display: block;
      margin: 80px auto;
      height: 1px;
      background: rgba(51, 51, 51, 0.2);
    }
  }
}
</style>
