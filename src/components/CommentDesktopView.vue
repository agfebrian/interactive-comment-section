<script setup lang="ts">
//
</script>

<template>
  <div class="grid">
    <div class="aside">
      <div class="counter">
        <div class="plus">+</div>
        <div class="count">12</div>
        <div class="min">-</div>
      </div>
    </div>
    <div class="header">
      <img
        src="https://karaktereling.org/wp-content/uploads/2019/03/users-vector-icon-png_260862.jpg"
        alt="user"
      />
      <p class="title">arnyrobson</p>
      <p class="date">1 month ago</p>
      <button>Reply</button>
    </div>
    <div class="content">
      <p>
        Impressive! Thought it seems the drag feature be imporved. But overall
        it looks incredible. You've nailed the design and responsiveness at
        various breakpoints works really well.
      </p>
    </div>
  </div>
</template>

<style scoped>
.grid {
  width: 100%;
  display: grid;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--color-neutral-white);
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.aside {
  padding: 0 5px 0 0;
  grid-row-start: 1;
  grid-row-end: 4;
}

.header {
  grid-column-start: 2;
  grid-column-end: 13;
  display: flex;
  align-items: center;
}

.header > img {
  width: 35px;
  border-radius: 50%;
}

.header > .title {
  font-weight: 500;
  margin-left: 10px;
}

.header > .date {
  font-weight: 400;
  margin-left: 10px;
}

.header > button {
  margin-left: auto;
}

.content {
  grid-column-start: 2;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 4;
}

.counter {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
  background-color: var(--color-neutral-very-light-gray);
}

.count {
  margin: 5px 0;
  color: var(--color-neutral-dark-blue);
}

.plus,
.min {
  padding: 5px 0;
  font-size: 0.8em;
  color: var(--color-neutral-grayish-blue);
}
</style>
