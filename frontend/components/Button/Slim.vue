<template>
  <button class="slim-button">
    <slot />
  </button>
</template>

<style scoped>
.slim-button {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  font-weight: 400;
  cursor: pointer;
  overflow: hidden;
  transition: max-width .3s, padding .3s, margin .3s, color .3s, background .3s, border-radius .3s, border-color .3s, opacity .3s;
  white-space: nowrap;
  border: 1px solid #fff;
  min-width: 120px;
  justify-content: center;
  color: #fff;
}

.slim-button:hover {
  border: 1px solid var(--color-secondary);
}

.slim-button.is-active {
  color: var(--color-main);
  border: 1px solid var(--color-main);
}

@media (max-width: 640px) {
  .slim-button {
    min-width: 70px;
    padding: 0 8px;
  }
}
</style>
