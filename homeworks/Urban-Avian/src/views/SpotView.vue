<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { allSpots } from '@/data/spots'

const route = useRoute()

const spot = computed(() =>
  allSpots.find(
    (item) =>
      item.city === route.params.city &&
      item.id === Number(route.params.id)
  )
)
</script>

<template>
  <article v-if="spot" class="editorial-page">
    <section class="story-panel">
      <div class="story-inner">
        <div class="eyebrow">
          <div class="breadcrumb" aria-label="麵包屑導覽">
            <RouterLink :to="`/cities/${spot.city}`">{{ spot.cityName }}</RouterLink>
            <span>/</span>
            <RouterLink
              :to="{ path: `/cities/${spot.city}`, query: { type: spot.type } }"
            >
              {{ spot.location }}
            </RouterLink>
            <span>/</span>
            <span class="current-page" aria-current="page">介紹圖鑑</span>
          </div>
          <span class="category">{{ spot.type === 'food' ? '🍽️' : spot.type === 'spots' ? '🔭' : '🌳' }} {{ spot.category }}</span>
        </div>

        <div class="issue-mark" aria-hidden="true">
          <span>URBAN FIELD NOTE</span>
          <span>NO. {{ String(spot.id).padStart(2, '0') }}</span>
        </div>

        <header class="article-header">
          <p class="kicker">{{ spot.kicker }}</p>
          <h1>{{ spot.title }}</h1>
        </header>

        <div class="article-copy">
          <p class="lead">{{ spot.lead }}</p>
          <p>{{ spot.content }}</p>
        </div>

        <aside class="field-notes" aria-label="生態小檔案">
          <div class="notes-heading">
            <span>生態小檔案</span>
            <span class="notes-number">{{ String(spot.id).padStart(2, '0') }}</span>
          </div>
          <dl>
            <div>
              <dt>出沒月份</dt>
              <dd>{{ spot.months }}</dd>
            </div>
            <div>
              <dt>常見習性</dt>
              <dd>{{ spot.habits }}</dd>
            </div>
            <div>
              <dt>觀察難易度</dt>
              <dd>
                <span class="stars" :aria-label="`${spot.difficulty} 顆星`">{{ '★'.repeat(spot.difficulty) }}</span>
                {{ spot.difficulty >= 4 ? '容易遇見' : '需要耐心等待' }}
              </dd>
            </div>
          </dl>
        </aside>

        <RouterLink :to="`/cities/${spot.city}`" class="back-link">
          <span aria-hidden="true">←</span>
          <span>Back to {{ spot.cityEnglishName }}</span>
        </RouterLink>
      </div>
    </section>

    <figure class="visual-panel">
      <img :src="spot.imageUrl" :alt="spot.name">
      <div class="image-shade"></div>
      <figcaption>{{ spot.location.toUpperCase() }} · {{ spot.cityEnglishName.toUpperCase() }}</figcaption>
      <p class="scientific-name">{{ spot.scientificName }}</p>
      <span class="page-number" aria-hidden="true">{{ String(spot.id).padStart(2, '0') }}</span>
    </figure>
  </article>

  <div v-else class="not-found">
    <p>找不到這筆詳細資料。</p>
    <RouterLink to="/cities">返回城市列表</RouterLink>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Noto+Serif+TC:wght@600;700&display=swap');

* {
  box-sizing: border-box;
}

.editorial-page {
  --forest: #17372b;
  --orange: #c96d2d;
  display: grid;
  grid-template-columns: minmax(460px, 0.88fr) minmax(500px, 1.12fr);
  width: min(1440px, 100%);
  min-height: 790px;
  margin-bottom: clamp(56px, 8vw, 110px);
  background: #f4f1e9;
  color: #28352f;
  overflow: hidden;
}

.story-panel {
  display: flex;
  justify-content: flex-end;
}

.story-inner {
  display: flex;
  flex-direction: column;
  width: min(100%, 620px);
  padding: 46px clamp(36px, 5vw, 78px) 44px;
}

.eyebrow,
.breadcrumb,
.issue-mark,
.notes-heading {
  display: flex;
  align-items: center;
}

.eyebrow {
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(23, 55, 43, 0.18);
  color: rgba(23, 55, 43, 0.6);
  font-size: 12px;
  letter-spacing: 0.1em;
}

.breadcrumb {
  flex-wrap: wrap;
  gap: 7px;
}

.breadcrumb a {
  color: inherit;
  text-decoration: none;
  transition: color 180ms ease;
}

.breadcrumb a:hover {
  color: var(--orange);
}

.breadcrumb a {
  position: relative;
}

.breadcrumb a::after {
  position: absolute;
  right: 0;
  bottom: -4px;
  left: 0;
  height: 1px;
  background: var(--orange);
  content: '';
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 180ms ease;
}

.breadcrumb a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.current-page {
  color: rgba(23, 55, 43, 0.4);
}

.category {
  flex: none;
  color: var(--forest);
  font-weight: 700;
}

.issue-mark {
  justify-content: space-between;
  margin-top: 23px;
  color: rgba(23, 55, 43, 0.42);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.article-header {
  margin: 47px 0 30px;
}

.kicker {
  margin: 0 0 16px;
  color: var(--orange);
  font-family: Georgia, serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.26em;
}

h1 {
  margin: 0;
  color: var(--forest);
  font-family: 'Noto Serif TC', 'Songti TC', 'PMingLiU', serif;
  font-size: clamp(36px, 3.6vw, 52px);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.28;
  white-space: pre-line;
}

.not-found {
  padding: 80px 24px;
  color: #17372b;
  text-align: center;
}

.not-found a {
  color: #c96d2d;
}

.article-copy {
  max-width: 500px;
}

.article-copy p {
  margin: 0;
  color: #59635e;
  font-size: 15px;
  letter-spacing: 0.035em;
  line-height: 1.9;
}

.article-copy .lead {
  margin-bottom: 16px;
  color: #35463e;
  font-family: 'Noto Serif TC', 'Songti TC', serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.85;
}

.lead::first-letter {
  float: left;
  margin: 8px 8px 0 0;
  color: var(--orange);
  font-family: Georgia, serif;
  font-size: 52px;
  line-height: 0.7;
}

.field-notes {
  margin-top: 31px;
  padding: 20px 22px 16px;
  background: #e4e9df;
  border-left: 3px solid var(--forest);
}

.notes-heading {
  justify-content: space-between;
  padding-bottom: 12px;
  color: var(--forest);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.notes-number {
  color: rgba(23, 55, 43, 0.3);
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}

.field-notes dl {
  margin: 0;
}

.field-notes dl div {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 12px;
  padding: 9px 0;
  border-top: 1px solid rgba(23, 55, 43, 0.12);
  font-size: 13px;
  line-height: 1.5;
}

.field-notes dt {
  color: #718078;
}

.field-notes dd {
  margin: 0;
  color: var(--forest);
  font-weight: 700;
}

.stars {
  margin-right: 5px;
  color: var(--orange);
  font-size: 11px;
  letter-spacing: 0.06em;
}

.back-link {
  position: relative;
  align-self: flex-start;
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 30px;
  color: var(--forest);
  font-family: Georgia, serif;
  font-size: 13px;
  font-style: italic;
  letter-spacing: 0.08em;
  text-decoration: none;
}

.back-link::after {
  position: absolute;
  bottom: -7px;
  left: 25px;
  width: 0;
  height: 2px;
  background: var(--orange);
  content: '';
  transition: width 220ms ease;
}

.back-link:hover::after {
  width: calc(100% - 25px);
}

.visual-panel {
  position: relative;
  min-height: 790px;
  margin: 0;
  overflow: hidden;
  background: #33473d;
}

.visual-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.76) contrast(1.06);
  transition: transform 1.2s cubic-bezier(.2, .65, .25, 1);
}

.visual-panel:hover img {
  transform: scale(1.025);
}

.image-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(12, 31, 23, 0.18), transparent 35%),
    linear-gradient(0deg, rgba(7, 20, 14, 0.55), transparent 30%);
  pointer-events: none;
}

.scientific-name {
  position: absolute;
  top: 50%;
  right: -105px;
  width: 300px;
  margin: 0;
  transform: rotate(90deg);
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 22px;
  font-style: italic;
  letter-spacing: 0.09em;
  white-space: nowrap;
}

.visual-panel figcaption {
  position: absolute;
  bottom: 34px;
  left: 38px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
}

.page-number {
  position: absolute;
  right: 37px;
  bottom: 25px;
  color: rgba(255, 255, 255, 0.88);
  font-family: Georgia, serif;
  font-size: 40px;
  font-style: italic;
}

@media (max-width: 960px) {
  .editorial-page {
    grid-template-columns: 1fr;
  }

  .story-panel {
    justify-content: center;
  }

  .story-inner {
    width: min(100%, 720px);
    padding: 38px 32px 46px;
  }

  .visual-panel {
    order: -1;
    min-height: min(68vh, 620px);
  }

  .back-link {
    margin-top: 8px;
  }
}

@media (max-width: 560px) {
  .story-inner {
    padding: 28px 20px 38px;
  }

  .eyebrow {
    align-items: flex-start;
  }

  .breadcrumb {
    max-width: 240px;
  }

  .article-header {
    margin: 38px 0 25px;
  }

  h1 {
    font-size: 34px;
  }

  .field-notes dl div {
    grid-template-columns: 82px 1fr;
  }

  .visual-panel {
    min-height: 470px;
  }

  .scientific-name {
    right: -118px;
  }
}
</style>
