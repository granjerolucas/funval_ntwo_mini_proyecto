import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/funval_ntwo_mini_proyecto/',
  plugins: [react()],
})
