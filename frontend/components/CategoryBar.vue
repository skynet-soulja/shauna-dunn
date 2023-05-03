<script setup lang="ts">
const gql = useStrapiGraphQL()

type QueryResults = {
  data: {
    categories: {
      data: {
        attributes: {
          name: string
        }
      }[]
    }
  }
}

const queryResults = await gql<QueryResults>(`
query {
  categories {
    data {
      attributes {
        name
      }
    }
  }
}`);

const category = useCategory();
</script>

<template>
  <div class="category-bar">
    <div class="category-container">
      <a href="#" :class="`category-to-top`">
        <div class="category-to-top-inner">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8.69899 3.08174L7.76441 4.02584L7.75493 4.0258L1.3542 10.4265L0.0117182 9.08405L6.41245 2.68332L8.69707 0.398693L10.0396 1.74118L17.4565 9.15817L16.1159 10.4893L9.66059 4.0339L8.69899 3.08174ZM8.22508 5.69881L10.4911 7.2949L10.5527 21.8672L8.29342 21.8576L8.22508 5.69881Z"
              fill="white"></path>
          </svg>
        </div>
      </a>

      <ul class="category-buttons">
        <ButtonSlim :class="category === 'All' ? 'is-active' : ''" @click="updateCategory('All')">
          All
        </ButtonSlim>

        <ButtonSlim v-for="c in queryResults.data.categories.data"
          :class="category === c.attributes.name ? 'is-active' : ''" @click="updateCategory(c.attributes.name)">
          {{ c.attributes.name }}
        </ButtonSlim>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.category-bar {
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 100%;
  font-size: 14px;
  transition: all .3s ease-in-out;
  z-index: 9;
}

.category-container {
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 9;
}

.category-buttons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 60px;
  text-align: center;
  overflow: hidden;
  color: var(--color-main);
  z-index: 9;
  padding: 2px 12px;
  background: rgba(34, 34, 34, 0.6);
}

.category-to-top {
  position: absolute;
  bottom: 0;
  pointer-events: auto;
  right: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-secondary);
  cursor: pointer;
  transition: all .3s;
}

.category-to-top:hover .category-to-top-inner {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)
}

.category-to-top-inner {
  background-color: var(--color-main);
  transition: clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  clip-path: polygon(6% 6%, 94% 6%, 94% 94%, 6% 94%);
  will-change: clip-path;
  top: 4%;
  left: 4%;
  width: 92%;
  height: 92%;
  backface-visibility: hidden;
  transform-origin: center center;
}
</style>
