<script setup lang="ts">
const gql = useStrapiGraphQL()

type QueryResults = {
  data: {
    about: {
      data: {
        attributes: {
          bio: string;
          instagram: string;
          email: string;
          headshot: {
            data: {
              attributes: {
                url: string;
              }
            }
          }
        }
      }
    },
  }
}

const queryResults = await gql<QueryResults>(`
query {
	about {
    data {
      attributes {
        bio
        instagram
        email
        headshot {
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
</script>

<template>
  <div>
    <div class="about-container">
      <div class="headshot-wrapper">
        <img class="headshot" :src="queryResults?.data?.about?.data?.attributes?.headshot?.data?.attributes?.url"
          :srcset="generateCloudinarySRCSETURLs(queryResults?.data?.about?.data?.attributes?.headshot?.data?.attributes?.url).join(',')"
          alt="">
      </div>
      <div class="bio-wrapper">
        <p class="bio">{{ queryResults?.data?.about?.data?.attributes?.bio }}</p>
        <p v-if="queryResults?.data?.about?.data?.attributes?.email">Email: <a
            :href="`emailto:${queryResults?.data?.about?.data?.attributes?.email}`">{{
              queryResults?.data?.about?.data?.attributes?.email }}</a></p>
        <p v-if="queryResults?.data?.about?.data?.attributes?.instagram">Instagram: <a
            :href="`https://www.instagram.com/${queryResults?.data?.about?.data?.attributes?.instagram}`">@{{
              queryResults?.data?.about?.data?.attributes?.instagram }}</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  display: flex;
  margin-top: 60px;
  margin-bottom: 60px;
}

.headshot-wrapper {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0 2rem;
}

.headshot {
  max-width: 400px;
}

.bio-wrapper {
  flex: 1;
  padding: 30px 0;
  max-width: 750px;
}

.bio {
  font-size: 16px;
  line-height: 1.8rem;
}

p {
  margin-bottom: 1rem;
  font-size: 16px;
}

a {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .about-container {
    flex-direction: column;
  }

  .headshot-wrapper {
    margin: 0;
    max-width: 400px;
  }
}

@media (max-width: 768px) {}

@media (max-width: 640px) {
  .about-container {
    align-items: center;
    margin: 30px 0;
  }

  .bio-wrapper {
    text-align: center;
    padding-bottom: 0;
  }

  .bio {
    font-size: 14px;
    line-height: 1.4rem
  }

  p {
    font-size: 14px;
    margin-bottom: .5rem
  }

  .headshot {
    max-width: 82vw;
  }
}
</style>
