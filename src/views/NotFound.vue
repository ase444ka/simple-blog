<template>
  <div>
    <h1>Страница не найдена</h1>
    <p>
      Ой! Нет такой страницы, попробуйте перейти
      <router-link :to="{ name: 'Home' }">на главную</router-link>
    </p>
  </div>
</template>
