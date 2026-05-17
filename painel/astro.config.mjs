// @ts-check
import { defineConfig } from 'astro/config';

// em5 Painel — Astro config
// Build estático puro. Sem servidor, sem DB. Lê de ../em5/clientes/*/operacao/status.yaml.

export default defineConfig({
  output: 'static',
  site: 'https://em5.local',
  vite: {
    define: {
      'import.meta.env.EM5_ROOT': JSON.stringify('../'),
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
