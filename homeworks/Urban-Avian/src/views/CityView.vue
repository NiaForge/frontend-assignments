<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { allSpots } from '@/data/spots'

const route = useRoute()

function getCurrentCity() {
  return route.params.city
}

function getCurrentType() {
  return route.query.type
}

const filteredSpots = computed(() => {
  const currentCity = getCurrentCity()
  const currentType = getCurrentType()

  let result = allSpots.filter(
    (spot) => spot.city === currentCity
  )

  if (currentType) {
    result = result.filter(
      (spot) => spot.type === currentType
    )
  }

  return result
})
</script>

<template>
  <div class="city-page">
    
    <nav class="category-nav">
      <RouterLink :to="{ path: `/cities/${getCurrentCity()}` }" :class="{ active: !getCurrentType() }">
        顯示全部
      </RouterLink>
      
      <RouterLink :to="{ path: `/cities/${getCurrentCity()}`, query: { type: 'food' } }" :class="{ active: getCurrentType() === 'food' }">
        覓食食堂
      </RouterLink>
      
      <RouterLink :to="{ path: `/cities/${getCurrentCity()}`, query: { type: 'habitat' } }" :class="{ active: getCurrentType() === 'habitat' }">
        出沒棲地
      </RouterLink>
      
      <RouterLink :to="{ path: `/cities/${getCurrentCity()}`, query: { type: 'spots' } }" :class="{ active: getCurrentType() === 'spots' }">
        賞鳥點
      </RouterLink>
    </nav>

    <div v-if="filteredSpots.length > 0" class="spot-list">
      <RouterLink 
        v-for="spot in filteredSpots" 
        :key="spot.id" 
        :to="{ path: `/cities/${getCurrentCity()}/spots/${spot.id}`, query: { type: getCurrentType() } }"
        class="spot-card"
      >
        <div class="card-image">
         <img :src="spot.imageUrl" :alt="spot.name" class="spot-img" />
        </div>
        
        <div class="card-content">
          <span class="card-tag">{{ spot.tag }}</span>
          <h2 class="card-title">{{ spot.location }}</h2>
          <p class="card-desc">{{ spot.description }}</p>
        </div>
      </RouterLink>
    </div>

    <div v-else class="no-data">
      <p>這裡沒資料</p>
    </div>

  </div>
</template>

<style scoped>
 
.city-page {
  padding-bottom: 50px;
}

.category-nav {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.category-nav a {
  text-decoration: none;
  color: #718096;
  font-weight: 500;
  padding-bottom: 10px;
  position: relative;
  transition: color 0.2s;
}

/* 滑鼠懸停與被選中時的顏色 */
.category-nav a:hover,
.category-nav a.active {
  color: #1a202c;
}

/* 被選中時（.active）底部的黑線效果 */
.category-nav a.active::after {
  content: '';
  position: absolute;
  bottom: -1px; /* 剛好貼在 nav 的 border-bottom 上 */
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #2d3748; /* 深色底線 */
}

/* ================= 卡片列表 CSS ================= */
.spot-list {
  display: flex;
  flex-direction: column; /* 直向排列列表項 */
  gap: 20px;
}

/* 改用 Flex 讓圖片在左、文字在右 */
.spot-card {
  display: flex;
  width: 100%;
  height: 180px;
  text-decoration: none;
  color: #2d3748;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s, box-shadow 0.2s; /* 滑鼠懸停動畫 */
  max-width: 700px; /* 限制卡片最大寬度，避免拉得太長 */
}

/* 懸停 (Hover) 效果：稍微浮起 + 陰影加深 */
.spot-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-image {
  width: 180px;
  height: 100%;
  flex-shrink: 0; /* 防止圖片被文字壓縮變形 */
  overflow: hidden;
}

.placeholder-img {
  width: 100%;
  height: 100%;
  background-color: #cbd5e0; /* 保留一個背景色打底 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
}

/* 2. 新增圖片的樣式 (這非常關鍵) */
.spot-img {
  width: 100%;
  height: 100%; 
  object-fit: cover; /* 💡 這是裁切圖片最重要的一行！ */
  display: block; /* 移除圖片底部的空白 */
}

.card-content {
  min-width: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.card-tag {
  background-color: #edf2f7;
  color: #4a5568;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-weight: 500;
}

.card-title {
  font-size: 18px;
  margin: 0 0 8px 0;
  font-weight: 700;
}

.card-desc {
  font-size: 14px;
  color: #718096;
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@media (max-width: 560px) {
  .category-nav {
    width: calc(100vw - 32px);
    gap: 24px;
    margin-bottom: 22px;
    padding: 0 2px 10px;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .category-nav::-webkit-scrollbar {
    display: none;
  }

  .category-nav a {
    flex: 0 0 auto;
    font-size: 14px;
    white-space: nowrap;
  }

  .spot-card {
    height: 150px;
  }

  .card-image {
    width: 120px;
  }

  .card-content {
    padding: 14px;
  }

  .card-title {
    font-size: 16px;
  }
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #888;
  font-size: 1.2rem;
}
</style>
