<template>
<transition name="fade">
  <div class="delete-confirm">
    <p class="delete-comfirm__text">Вы уверены, что хотите удалить?</p>
    <button
      class="delete-confirm__delete btn btn-outline-danger"
      @click="agree"
    >
      Удалить
    </button>
    <button
      class="delete-confirm__cancel btn btn-outline-secondary"
      @click="cancel"
    >
      Отмена
    </button>
  </div>
</transition>
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
.delete-confirm {
  position: absolute;
  top: 0px;
  right: 0px;
  background: lightpink;
  color: darkred;
  border: 1px solid darkred;
  padding: 10px;
}
</style>
