<script setup lang="ts">
const gql = useStrapiGraphQL()

type QueryResults = {
  data: {
    about: {
      data: {
        attributes: {
          instagram: string;
        }
      }
    }
  }
}

const queryResults = await gql<QueryResults>(`
query {
	about {
    data {
      attributes {
        instagram
      }
    }
  }
}`)
</script>

<template>
  <div>
    <footer>
      <div class="footer-left">
        © {{ new Date().getFullYear() }} by William Martin
      </div>
      <div class="footer-right">
        <span class="connect" v-if="queryResults?.data?.about?.data?.attributes?.instagram"
          style="{font-style: bold;}">Connect: <a
            :href="`https://www.instagram.com/${queryResults?.data?.about?.data?.attributes?.instagram}`">@{{
              queryResults?.data?.about?.data?.attributes?.instagram }}</a></span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 48px;
  padding-top: clamp(24px, 3vw, 30px);
  font-size: 14px;
  font-weight: 400;
  background-image: linear-gradient(to right, var(--color-main) 0 10%, rgba(255, 255, 255, 0) 10%);
  background-position: top;
  background-size: 8px 1px;
  background-repeat: repeat-x;
}

.connect {
  position: relative;
  z-index: 101;
}

a {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  footer {
    padding-bottom: 60px;
    font-size: 12px;
  }
}

@media (max-width: 768px) {}

@media (max-width: 640px) {
  footer {
    padding-bottom: 20px;
    justify-content: center;
    align-items: unset;
  }

  .footer-left {
    margin-bottom: 12px;
    margin-right: 12px;
  }
}
</style>
