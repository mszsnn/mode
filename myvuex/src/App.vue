<template>
  <div id="app">
    {{ this.$store.getters.count }}
    <button @click="add">+</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    console.log(this.$store);
  },
  methods: {
    add() {
      this.$store.dispatch('asyncSetCount');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
