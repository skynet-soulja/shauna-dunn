<script setup lang="ts"></script>

<template>
  <div>
    <header>
      <nav>
        <div class="nav-left">
          <NuxtLink to="/">
            <h1 class="nav-home">
              Shuana Dunn
            </h1>
          </NuxtLink>
        </div>

        <div class="nav-right">
          <ul class="link-list">
            <li class="link-wrapper first">
              <NuxtLink class="link-right" to="/">Work</NuxtLink>
            </li>
            <li class="link-wrapper">
              <NuxtLink class="link-right" to="/about">About</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.nav-home {
  font-size: clamp(32px, 14.3521126761px + 3.9295774648vw, 52px);
  text-transform: uppercase;
  letter-spacing: .8rem;
}

nav {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 30px;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  flex: 1;
  margin-left: 10vw;
  display: flex;
  align-items: center;
}

.link-list {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.link-wrapper {
  font-size: 1.2rem;
  letter-spacing: unset;
}

.link-wrapper.first {
  margin-right: 4rem;
}

.link-right.router-link-exact-active {
  color: var(--color-main);
}
</style>
