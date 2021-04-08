<template>
  <div>
    <p>Запись успешно добавленa</p>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      if (this.$route.name == 'Success') {
        this.$router.push({ name: 'Home' });
      }
    }, 2000);
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
p {
  @extend %width;
}
</style>
