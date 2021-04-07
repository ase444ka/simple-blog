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
    
  },
  mounted() {
    this.entries = JSON.parse(localStorage.entries) || []
  },
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
