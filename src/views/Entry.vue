<template>
  <div class="entry content">
    <template v-if="entry">
      <h1>{{ entry.title }}</h1>
      <p>{{ entry.text }}</p>

      <entry-comments :id="entry.id" />
    </template>
  </div>
</template>

<script>
import EntryComments from '@/components/EntryComments.vue';
export default {
  components: { EntryComments },
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    entry() {
      return this.$store.state.entries.find((entry) => entry.id == this.id);
    },
  },
  mounted() {
    if (this.$route.hash) {
      document.querySelector(this.$route.hash).scrollIntoView(true);
    }
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/variables';
h1 {
  @extend %header;
}
p {
  text-align: justify;
}
</style>
