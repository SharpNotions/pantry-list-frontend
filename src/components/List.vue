<template>
  <div class="list">
    <h2>Shopping List</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.label }} - {{ item.votes }} votes
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      items: [
        { id: 0, votes: 0, label: 'Item 1' },
        { id: 1, votes: 0, label: 'Item 2' },
        { id: 2, votes: 0, label: 'Item 3' },
        { id: 3, votes: 0, label: 'Item 4' }
      ]
    }
  }
}
</script>

<style lang="scss">/style>
