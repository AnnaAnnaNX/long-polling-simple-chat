<script setup lang="ts">
import {onMounted, ref} from 'vue'
  import axios from 'axios'
  defineProps<{
    msg: string
  }>()
  const messages = ref([])
  const message = ref('')

  const send = async () => {
    if (message) {
      await axios.post('http://localhost:5000/new-message', {
        message: message.value,
        date: new Date()
      })
      message.value = ''
    }
  }

  const subscrube = async () => {
    try {
      const message = (await axios.get('http://localhost:5000/message')).data
      messages.value = [ message, ...messages.value ]
      subscrube()
    } catch (e) {
      setInterval(() => {subscrube()}, 500)
    }
  }

  onMounted(() => {
    subscrube()
  })
</script>

<template>
  <div>
    <textarea v-model="message" style="display: block;"></textarea>
    <button @click="send">Send</button>
  </div>
  <div v-for="message in messages" key="message.date">
    {{ message.message }}
  </div>
</template>

<style scoped>
</style>
