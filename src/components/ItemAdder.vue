<template>
  <div class="list">
    <input
      type="text"
      @keyup.enter="submit()"
      v-model="newLabel"
    />
    <button
      :disabled="canSubmit"
      @keyPress.enter="submit()"
      @click="submit()">+
    </button>
  </div>
</template>

<script>
export default {
  name: 'item-adder',
  props: {
    addItem: Function
  },
  data () {
    return {
      newLabel: ''
    }
  },
  computed: {
    canSubmit () {
      return !this.newLabel.length
    }
  },
  methods: {
    async submit () {
      await this.addItem(
        this.newLabel
      )
      this.newLabel = ''
    }
  }
}
</script>

<style lang="scss"></style>
