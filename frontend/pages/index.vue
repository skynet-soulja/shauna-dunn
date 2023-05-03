<script setup lang="ts">
const gql = useStrapiGraphQL()

type QueryResults = {
  data: {
    jewelries: {
      data: {
        attributes: {
          title: string;
          slug: string;
          category: {
            data: {
              attributes: {
                name: string;
              }
            }
          },
          photo: {
            data: {
              attributes: {
                url: string;
              }
            }
          }
        }
      }[]
    },
  }
}

const queryResults = await gql<QueryResults>(`
query {
  jewelries(sort:"publishedAt:desc") {
    data {
      attributes {
        title
        slug
        category {
          data {
            attributes {
              name
            }
          }
        }
        photo {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}`);

const category = useCategory();
</script>

<template>
  <div>
    <div class="category-wrapper">
      <h1 class="category">{{ category }}</h1>
    </div>

    <div class="work-cards">
      <div v-for="(j, index) in queryResults.data.jewelries.data"
        :class="`work-container ${category === 'All' || j.attributes.category.data.attributes.name === category ? 'is-active' : ''}`">
        <NuxtLink class="work-link" :to="`/work/${j.attributes.slug}`" />

        <div class="work-card">
          <div class="work-wrapper">

            <img class="work-photo" :src="j.attributes.photo.data.attributes.url"
              :srcset="generateCloudinarySRCSETURLs(j.attributes.photo.data.attributes.url).join(',')">
          </div>
        </div>

        <div class="work-text">
          <h1 v-if="j.attributes.title" class="work-title">
            {{ j.attributes.title }}
          </h1>
        </div>
      </div>
    </div>

    <CategoryBar />

  </div>
</template>

<style scoped>
.category-wrapper {
  margin-bottom: 30px;
  border-bottom: solid;
}

.category {
  font-size: 120px;
  text-align: right;
}

.work-cards {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.work-container {
  position: relative;
  display: none;
  max-width: 500px;
  margin-bottom: 90px;
  flex-basis: 60%;
  margin-left: 45px;
}

.work-container.is-active {
  display: block;
}

.work-container:hover .work-wrapper {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)
}

.work-card {
  position: relative;
  display: flex;
  align-items: flex-end;
  aspect-ratio: 27/28;
  overflow: hidden;
  background-color: var(--color-secondary);
}

.work-wrapper {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  clip-path: polygon(4% 4%, 96% 4%, 96% 96%, 4% 96%);
  will-change: clip-path;
  top: 1.5%;
  left: 1.5%;
  width: 97%;
  height: 97%;
  backface-visibility: hidden;
  transform-origin: center center;
  transition: clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.work-link {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.work-text {
  margin-top: 10px;
  color: var(--color-secondary);
}

.work-title {
  font-size: clamp(18px, 14.3521126761px + 2.9295774648vw, 18px);
  font-weight: 300;
  font-style: italic;
}

.work-photo {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  z-index: 3;
  transition: transform 200ms linear 0s;
}
</style>

