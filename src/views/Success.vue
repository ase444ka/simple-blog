<template>
  <div>
    <p>Запись успешно добавленa</p>
    <router-link :to="{ name: 'Home' }">перейти на главную</router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: 'Home' });
    }, 2000);
  },
};
</script>
