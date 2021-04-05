<template>
  <div class="about">
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
      entries: JSON.parse(localStorage.entries),
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
      return this.entries.find((entry) => entry.id == this.id);
    },
  },
  mounted() {
    this.localComments = this.entry.comments;
  },
  watch: {
    localComments(value) {
      let newEntries = this.entries.map((entry) => {
        if (this.id == entry.id) {
          entry.comments = value;
        }
        return entry;
      });
      this.entries = [...newEntries];
      localStorage.entries = JSON.stringify(newEntries);
    },
  },
};
</script>
