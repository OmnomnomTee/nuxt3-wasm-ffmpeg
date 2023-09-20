<script setup lang="ts">
interface FileUploadProps {
  modelValue: Blob | null
  multiple?: boolean
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  multiple: false,
})
const emit = defineEmits(['update:modelValue'])

const files = ref<Array<Blob>>([])

const onFileUpload = event => {
  if (!event.target.files) return

  if (props.multiple) {
    files.value = [...files.value, ...event.target.files]
  } else {
    files.value = [event.target.files[0]]
  }

  emit('update:modelValue', files.value)
}
</script>

<template>
  <section>
    <label for="file-input">File upload</label>
    <input id="file-input" type="file" accept=".avi" @input="onFileUpload" />
  </section>

  <div v-if="multiple">
    <h2>Files</h2>
    <ul>
      <li v-for="file in files" :key="file.name">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
