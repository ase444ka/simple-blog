<template>
  <div class="entry" v-if="entry">
    
    <h1>{{ entry.title }}</h1>
    <p>{{ entry.text }}</p>

    <entry-comments v-model="localComments" />
  </div>
</template>

<script>
import EntryComments from '@/components/EntryComments.vue';
export default {
  components: { EntryComments },
  data() {
    return {
      localComments: [],
    };
  },

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
    this.localComments = this.entry.comments;
  },


  watch: {
    localComments(value) {
      this.$store.commit('updateComments',{ id: this.id, comments: value});
    },
  },
};
</script>
