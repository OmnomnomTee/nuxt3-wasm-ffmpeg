<script setup lang="ts">
import FileUpload from '~/components/FileUpload.vue'

const files = ref<Array<Blob>>([])
const convertedFiles = ref<Array<Blob>>([])

const fileURL = computed(() => {
  if (files.value.length > 0) {
    return URL.createObjectURL(files.value[0])
  }

  return ''
})
</script>

<template>
  <main id="main" class="container">
    <h1>AVI to MP4 converter</h1>

    <p>Powered by WebAssembly, FFMPEG, and Nuxt 3</p>

    <FileUpload v-model="files" />

    <FFmpegDemo v-if="fileURL" v-model="convertedFiles" :video-url="fileURL" />
  </main>
</template>
