<template>
  <section class="container ffmmeg-demo">
    <video :src="video" class="video" controls />
    <button @click="transcode">Start transcoding</button>
    <p>{{ message }}</p>
  </section>
</template>

<script setup lang="ts">
import { FFmpeg } from '@ffmpeg/ffmpeg'
import type { LogEvent } from '@ffmpeg/ffmpeg/dist/esm/types'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { ref } from 'vue'

interface FFMPEGProps {
  videoUrl: string
}

const props = defineProps<FFMPEGProps>()

const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm'

const ffmpeg = new FFmpeg()
const message = ref('Click Start to Transcode')
const video = ref('')

const transcode = async () => {
  message.value = 'Loading ffmpeg-core.js'
  ffmpeg.on('log', ({ message: msg }: LogEvent) => {
    message.value = msg
  })
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    workerURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      'text/javascript'
    ),
  })
  message.value = 'Start transcoding'
  await ffmpeg.writeFile('test.avi', await fetchFile(props.videoUrl))
  await ffmpeg.exec(['-i', 'test.avi', 'test.mp4'])
  message.value = 'Complete transcoding'
  const data = await ffmpeg.readFile('test.mp4')
  video.value = URL.createObjectURL(
    new Blob([(data as Uint8Array).buffer], { type: 'video/mp4' })
  )
}
</script>

<style>
.ffmmeg-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  @media screen and (width >= 768px) {
    align-items: center;
    justify-content: center;
  }
}

.video {
  max-width: 85vw;
  width: min(90vw, 85rem);
  position: relative;
  padding-top: 2rem;

  @media screen and (width >= 768px) {
    width: min(55vw, 85rem);
  }

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
</style>
