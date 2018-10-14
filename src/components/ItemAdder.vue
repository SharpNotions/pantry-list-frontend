<template>
  <v-layout row>
    <v-text-field
      label="New Item"
      v-model="newLabel"
      @keyup.enter="submit()"
    ></v-text-field>
    <v-btn flat icon small
      color="primary"
      :disabled="!canSubmit"
      @keyPress.enter="submit()"
      @click="submit()">
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'item-adder',
  props: {
    addItem: Function
  },
  data() {
    return {
      newLabel: ''
    }
  },
  computed: {
    canSubmit() {
      return this.newLabel.length && !this.loading
    },
    ...mapState('list', ['loading'])
  },
  methods: {
    async submit() {
      await this.addItem(this.newLabel)
      this.newLabel = ''
    }
  }
}
</script>
