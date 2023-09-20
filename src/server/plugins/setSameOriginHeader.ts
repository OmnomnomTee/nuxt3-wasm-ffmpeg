import { RenderResponse } from 'nitropack'

export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:response', (response: RenderResponse) => {
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
  })
})
