<script setup lang="ts">
definePageMeta({
  layout: 'work',
  pageTransition: false,
  layoutTransition: false
})

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

const listOfJewelry = queryResults?.data?.jewelries?.data;
const listOfJewelryUnderCategory = listOfJewelry?.filter(j => category.value === 'All' ? true : j?.attributes?.category?.data?.attributes?.name === category.value);
const currentJewelryIndex = listOfJewelryUnderCategory?.findIndex(j => j?.attributes?.slug === useRoute().params.slug);
const precedingJewelryIndex = currentJewelryIndex - 1;
const procedingJewelryIndex = currentJewelryIndex + 1;

const currentJewelry = listOfJewelryUnderCategory?.[currentJewelryIndex];
const precedingJewelry = listOfJewelryUnderCategory?.[precedingJewelryIndex];
const procedingJewelry = listOfJewelryUnderCategory?.[procedingJewelryIndex];

const currentPhotoURL = currentJewelry.attributes.photo.data.attributes.url;
</script>

<template>
  <div>
    <div class="work-page">
      <div class="back-wrapper">
        <NuxtLink class="back-link" to="/">
          <svg class="reflect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="14">
            <g id="arrow">
              <path xmlns="http://www.w3.org/2000/svg"
                d="M17.8,9H0v1.9h17.8l-5.6,6.7l1.5,0.9l5.8-6.9c0.8-0.9,0.8-2.4,0-3.3l-5.6-6.7l-1.5,0.9L17.8,9z" />
            </g>
          </svg>
          <span>
            Back to Work
          </span>
        </NuxtLink>
      </div>

      <div class="work-background"></div>

      <div class="work-container">
        <div class="navigation navigation-preceding">
          <NuxtLink v-if="precedingJewelry" :to="`/work/${precedingJewelry.attributes.slug}`">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="none" width="15" height="27"
              viewBox="0 0 15 27">
              <g fill-rule="evenodd">
                <path fill-rule="nonzero" d="M14.258 1.53L13.198.47-.061 13.728l13.259 13.258 1.06-1.06L2.061 13.728z">
                </path>
              </g>
            </svg>
          </NuxtLink>
        </div>

        <div class="photo-container">
          <div class="title-wrapper">
            <h2 class="title">• {{ currentJewelry.attributes.title }} •</h2>
          </div>

          <div class="category-wrapper">
            <h2 class="category">• {{ category }} •</h2>
          </div>
          <img class="photo" :src="currentPhotoURL" :srcset="generateCloudinarySRCSETURLs(currentPhotoURL).join(',')">
        </div>

        <div class="navigation navigation-proceding">
          <NuxtLink v-if="procedingJewelry" :to="`/work/${procedingJewelry.attributes.slug}`">
            <svg fill="currentColor" stroke="none" width="15" height="27" viewBox="0 0 15 27">
              <g fill-rule="evenodd">
                <path fill-rule="nonzero" d="M.198 25.926l1.06 1.06 13.259-13.258L1.258.47.198 1.53l12.197 12.198z">
                </path>
              </g>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-page {
  position: relative;
  color: var(--color-bg);
}

.back-wrapper {
  position: absolute;
  top: 3vh;
  left: 1vw;
  z-index: 100;
}

.back-link {
  display: flex;
  font-size: .9rem;
}

.reflect {
  transform: scaleX(-1);
  vertical-align: middle;
  margin-right: 8px;
}

.work-container {
  display: flex;
  height: 100vh;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 5vw;
  z-index: 99;
}

.photo-container {
  position: relative;
  flex: 1;
  border-radius: 1rem;
  aspect-ratio: 14/7;
  overflow: hidden;
  background-color: #EBC3DB;
}

.title-wrapper {
  position: absolute;
  top: 2vh;
  left: 50%;
  z-index: 99;
}

.title {
  position: relative;
  left: -50%;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.category-wrapper {
  position: absolute;
  bottom: 2vh;
  left: 50%;
  z-index: 99;
}

.category {
  position: relative;
  left: -50%;
  font-size: 1.5rem;
  text-transform: uppercase;
}

.photo {
  position: absolute;
  top: 7.5%;
  left: 5%;
  display: block;
  width: 90%;
  height: 85%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 1rem;
  z-index: 2;
  transition: transform 200ms linear 0s;
}

.work-background {
  background-color: #fff;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

@media (max-width: 1280px) {
  .photo {
    top: 6%;
    left: 0;
    width: 100%;
    height: 88%;
  }

  .title,
  .category {
    font-size: 1.3rem;
  }
}

@media (max-width: 1024px) {
  .photo {
    height: 80%;
    top: 10%;
  }

  .title-wrapper {
    top: 5vh;
  }

  .category-wrapper {
    bottom: 5vh;
  }
}

@media (max-width: 829px) {
  .back-wrapper {
    left: 5vw;
  }

  .photo {
    height: 70%;
    top: 15%;
  }

  .title-wrapper {
    top: 10vh;
  }

  .category-wrapper {
    bottom: 10vh;
  }
}

@media (max-width: 640px) {

  .title,
  .category {
    font-size: 1.1rem;
  }

  .photo {
    height: 56%;
    top: 22%;
  }

  .title-wrapper {
    top: 18vh;
  }

  .category-wrapper {
    bottom: 18vh;
  }
}

@media (max-width: 540px) {
  .photo {
    height: 46%;
    top: 27%;
  }

  .title-wrapper {
    top: 20vh;
  }

  .category-wrapper {
    bottom: 20vh;
  }
}

@media (max-width: 480px) {

  .title,
  .category {
    font-size: 14px;
  }

  .navigation {
    min-width: 9vw;
  }

  .photo {
    height: 40%;
    top: 30%;
  }

  .title-wrapper {
    top: 22vh;
  }

  .category-wrapper {
    bottom: 22vh;
  }
}
</style>
