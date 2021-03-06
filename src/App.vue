<template>
  <Dashboard />
</template>

<script>
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'App',
  components: {
    Dashboard
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;800&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }
  body {
    background: white;
    color: #24262A;
    height: 100vh;
    font-family: 'Poppins';
  }
</style>
