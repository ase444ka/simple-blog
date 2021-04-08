<template>
  <div id="app">
    <div class="blog__cover"></div>
    <header class="blog__header">
      <div class="blog__header_container">
        <h1><router-link to="/">Мой простой блог</router-link></h1>
        <router-link to="/new-entry/" class="blog__header__new-entry-link"
          ><span class="material-icons">note_add</span></router-link
        >
      </div>
    </header>
    <div class="blog__container blog__container_body">
      <div class="entry__nav" v-if="showEntryNav">
        <router-link
          v-if="previous"
          :to="{ name: 'Entry', params: { id: previous } }"
          class="card-link entry__nav__link entry__nav__link_previous"
          >Предыдущая запись</router-link
        >
        <span
          v-else
          class="card-link entry__nav__link entry__nav__link_previous entry__nav__link_disabled"
          >Предыдущая запись</span
        >
        <router-link
          v-if="next"
          class="card-link entry__nav__link entry__nav__link_next"
          :to="{ name: 'Entry', params: { id: next } }"
          >Следующая запись</router-link
        >
        <span
          v-else
          class="card-link entry__nav__link entry__nav__link_next entry__nav__link_disabled"
          >Следующая запись</span
        >
      </div>

      <transition name="fade" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
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
@import '@/assets/variables.scss';
.blog {
  &__cover {
    background: $vine;
    height: 209px;
    @media screen and (max-width: 680px) {
      height: 75px;
    }
  }
  &__container {
    width: 90%;
    margin: auto;
    box-shadow: 0 30px 50px 0 rgba(1, 1, 1, 0.15);
    &_body {
      position: relative;
      background: white;
      min-height: 100%;
      margin: 0 auto;
      z-index: 100;
      padding-top: 150px;
      @media screen and (max-width: 900px) {
        padding-top: 100px;
      }
      @media screen and (max-width: 600px) {
        padding-top: 50px;
      }
    }
  }

  &__header {
    background: $vine;
    color: white;
    position: fixed;
    margin: auto;
    width: 100%;
    padding: 10px 0;
    top: 0px;
    transition: transform 0.4s ease-in;

    &_over {
      z-index: 1000;
    }
    &_translated {
      transform: translateY(-200px);
    }
    &_container {
      margin: auto;
      display: flex;
      justify-content: space-between;
      width: 90%;
    }
    * {
      font-family: Andika;
      font-size: 2rem;
      padding: 5px;
      text-transform: lowercase;
      @media screen and (max-width: 500px) {
        font-size: 1.5rem;
      }
    }
    &__new-entry-link {
      font-family: 'Material Icons';
      text-transform: uppercase;
      &:hover {
        background: rgba($color: #ffffff, $alpha: 0.1);
        font-family: Raleway;
        text-transform: uppercase;
        box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.15);
        color: white;
        height: max-content;
      }
    }
    a {
      color: white;
      text-decoration: none;
      height: max-content;
    }
    h1 {
      @media screen and (max-width: 400px) {
        font-size: 1rem;
      }
    }
  }
}

.entry__nav {
  @extend %width;
  display: grid;
  grid-template-columns: 1fr 1fr;
  &__link {
    display: flex;
    cursor: pointer;
    &:hover {
      color: $vine;
      text-decoration: underline;
    }
    &_previous {
      grid-area: 1 / 1 / 2 / 2;
      justify-content: flex-start;
      color: $vine;
    }
    &_next {
      grid-area: 1 / 2 / 2 / 3;
      justify-content: flex-end;
      color: $vine;
    }
    &_disabled {
      color: lightgray;
      cursor: default;
      &:hover {
        color: lightgray;
        cursor: default;
        text-decoration: none;
      }
    }
  }
}
</style>
