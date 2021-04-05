<template>
  <div id="app">
    <h1>Мой простой блог</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/new-entry/">NEW</router-link>
    </div>
    <router-view />
  </div>
</template>
