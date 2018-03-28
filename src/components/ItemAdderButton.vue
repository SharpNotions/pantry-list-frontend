<template>
  <v-btn flat icon small
    color="primary"
    @click="formDialog = true">
    <v-icon>add</v-icon>
    <v-dialog v-model="formDialog" max-width="500px" lazy>
      <v-card>
        <v-card-title class="subheading">Add New Item</v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form" @submit.prevent="submit">
            <v-text-field
              ref="nameInput"
              label="Name"
              v-model="form.name"
              :rules="nameRules"
              required>
            </v-text-field>
            <v-text-field label="Description" v-model="form.description">
            </v-text-field>
            <v-checkbox label="Add Another" v-model="addAnother"></v-checkbox>
            <v-btn type="submit" :disabled="!valid">submit</v-btn>
            <v-btn @click="formDialog = false" flat>cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
  name: 'item-adder-button',
  data () {
    return {
      valid: false,
      form: {
        name: '',
        description: ''
      },
      addAnother: false,
      formDialog: false,
      nameRules: [
        value => !!value || 'Name is required'
      ]
    }
  },
  watch: {
    formDialog (value) {
      if (value && this.$refs.form) {
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    submit () {      
      if (this.$refs.form.validate()) {
        const payload = {
          item_name: this.form.name,
          item_details: {
            description: this.form.description
          }
        }
        this.$emit('add-item', payload)
        
        if (!this.addAnother) {
          this.formDialog = false
        } else {
          const temp = this.addAnother
          this.$refs.nameInput.focus()
          this.$refs.form.reset()
          this.addAnother = temp
        }
      }
    }
  }
 }
</script>
