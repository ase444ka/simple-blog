<template>
  <div class="delete-confirm">
    <p class="delete-comfirm__text">Вы уверены, что хотите удалить?</p>
    <button class="button button_red" @click="agree">Удалить</button>
    <button class="button button_white" @click="cancel">Отмена</button>
  </div>
</template>
<script>
export default {
  methods: {
    agree() {
      this.$emit('agree');
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables';
.delete-confirm {
  color: $vine;
  border: 1px solid $vine;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 10px 20px 0 rgba(1, 1, 1, 0.15);
  @media screen and (max-width: 300px) {
    border: none;
  }
}
</style>
