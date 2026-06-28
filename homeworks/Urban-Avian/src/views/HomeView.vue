<script setup>

</script>

<template>
  <div class="hero-section">
    <span class="subtitle">URBAN WILDLIFE</span>
    <h2 class="title">都會尋羽</h2>
    <p class="description">
      重新定義城市與自然的邊界。透過數據與觀察，我們帶您走入身邊的羽翼世界，看見被忽略的都會奇蹟。
    </p>
    <RouterLink to="/cities">
      <button class="cta-button">
       立即探索城市
       <span class="arrow">→</span>
      </button>
    </RouterLink>
    
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

.hero-section {
  max-width: 500px; /* 限制寬度以符合圖片的換行感 */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  margin-top: 5%;
}

.subtitle {
  color: #D07923;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px; /* 英文拉開字距 */
  margin-bottom: 15px;
}

.title {
  color: #1A2F21;
  font-size: 48px; /* 顯眼的大標 */
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 24px;
  line-height: 1.2;
}

.description {
  width: 50%;
  color: #7E8881;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 35px;
  letter-spacing: 0.5px;
}

.cta-button {
  background-color: #CE7922;
  color: #ffffff;
  border: none;
  border-radius: 30px; /* 圓角按鈕 */
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s, transform 0.1s;
}

.cta-button:hover {
  background-color: #B5651B; /* 懸停時稍微加深 */
}

.cta-button:active {
  transform: scale(0.98);
}

.arrow {
  font-size: 18px;
  line-height: 1;
}
</style>