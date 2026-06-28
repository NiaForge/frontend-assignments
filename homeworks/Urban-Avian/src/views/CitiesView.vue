<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'


// 建立城市假資料，ID 必須固定好，用來當作網址路徑
const cities = ref([
  {
    id: 'taipei',
    name: '台北',
    englishName: 'Taipei',
    description: '都會森林與濕地交匯處',
    speciesCount: '24+',
    imageUrl: '/imges/taipei.webp'
  },
  {
    id: 'taichung',
    name: '台中',
    englishName: 'Taichung',
    description: '綠地與滯洪池生態圈',
    speciesCount: '18+',
    imageUrl: '/imges/Taichung.webp'
  },
  {
    id: 'tainan',
    name: '台南',
    englishName: 'Tainan',
    description: '國際級黑面琵鷺棲地',
    speciesCount: '42+',
    imageUrl: '/imges/Tainan.webp'
  },
  {
    id: 'kaohsiung',
    name: '高雄',
    englishName: 'Kaohsiung',
    description: '工業與埤塘的共生奇蹟',
    speciesCount: '31+',
    imageUrl: '/imges/kaohsiung.webp'
  }
])
</script>

<template>
  <div class="home-container">
    <h1>導覽首站：選擇您的觀察城市</h1>
    
    <div class="card-grid">
      
      <RouterLink 
        v-for="city in cities" 
        :key="city.id" 
        :to="`/cities/${city.id}`" 
        class="city-card"
      >
        <div class="card-image">
          <img :src="city.imageUrl" :alt="city.name" />
        </div>
        
        <div class="card-content">
          <h2 class="card-title">
            {{ city.name }} <span>{{ city.englishName }}</span>
          </h2>
          <p class="card-desc">{{ city.description }}</p>
          <span class="card-meta">觀察種：{{ city.speciesCount }}</span>
        </div>
        
      </RouterLink>
      
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: min(1280px, calc(100% - 48px));
  padding-bottom: 72px;
}

.home-container > h1 {
  margin: 0 0 30px;
  color: #1b3022;
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.3;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.city-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  text-decoration: none; /* 移除超連結的底線 */
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 12px; /* 圓角效果 */
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.2s; /* 加上滑過時的微動效 */
}

.city-card:hover {
  transform: translateY(-5px); /* 滑鼠懸停時卡片稍微往上浮起 */
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.card-image img {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover; /* 確保圖片不變形地填滿空間 */
}

.card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
}

.card-title {
  margin: 0 0 10px;
}

.card-title span {
  color: #7a847e;
  font-size: 14px;
  font-weight: 500;
}

.card-desc {
  margin: 0 0 18px;
  color: #68736c;
  line-height: 1.6;
}

.card-meta {
  margin-top: auto;
  color: #b96525;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 960px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card-image img {
    height: 220px;
  }
}

@media (max-width: 560px) {
  .home-container {
    width: calc(100% - 32px);
    padding-bottom: 48px;
  }

  .home-container > h1 {
    margin-bottom: 22px;
    font-size: 26px;
  }

  .card-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .card-image img {
    height: 210px;
  }
}
</style>
