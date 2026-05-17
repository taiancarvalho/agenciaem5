// em5 Desktop — Preload Script
// Contexto isolado entre Electron e o painel Astro estático.
// Por enquanto, painel não precisa de API ponte — é puramente estático.
// Reservado pra futuras integrações (IPC pra ler em5-config, etc.).

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('em5', {
  version: '1.2.0',
  platform: process.platform,
  isElectron: true,
});
