<script setup>
import { RouterView , RouterLink} from 'vue-router' 
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>URBAN WINGS</h1>
      <nav class="main-nav" aria-label="主要導覽">
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/cities">城市列表</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView></RouterView>
    </main>

  </div>
  
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header {
  background-color: #1B3022;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 30px 50px;
  margin-bottom: 50px;
}

.header h1 {
  flex-shrink: 0;
  font-size: 28px;
  letter-spacing: 0.04em;
}

.header a {
  position: relative;
  text-decoration: none;
  color: #ffffff;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.header a:hover,
.header a.router-link-active {
  color: #e3a15f;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}
.app-container {
  background-color: #F9F7F2;
  width: 100%;
  max-height: 150vh;
  height: 100vh;
  margin: 0 auto;
}
.content {
  display: flex;
  justify-content: center;
  padding: 0;
}

@media (max-width: 640px) {
  .header {
    align-items: center;
    padding: 18px 20px;
    margin-bottom: 28px;
  }

  .header h1 {
    font-size: 19px;
    letter-spacing: 0.03em;
  }

  .main-nav {
    gap: 14px;
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .header {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
}

</style>
