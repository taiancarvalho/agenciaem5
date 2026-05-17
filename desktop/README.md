# em5 Desktop

> Wrapper Electron do painel em5 — distribui como `.dmg` (Mac), `.exe` (Win), `.AppImage` (Linux).
> Open source MIT. Free pra sempre.

## Dev

```bash
# Terminal 1: roda Astro dev server
cd painel
npm install
npm run dev   # localhost:4321

# Terminal 2: roda Electron apontando pro dev server
cd desktop
npm install
npm run dev   # abre janela Electron
```

## Build pro seu OS

```bash
# Mac (.dmg)
cd painel && npm run build && cd ../desktop && npm run build:mac

# Win (.exe NSIS installer)
cd painel && npm run build && cd ../desktop && npm run build:win

# Linux (.AppImage)
cd painel && npm run build && cd ../desktop && npm run build:linux

# Todos (precisa ferramentas de cross-build)
npm run build:all
```

Output em `desktop/dist-app/`.

## Distribuição

Tag + push:
```bash
git tag v1.2.0
git push origin v1.2.0
```

Workflow CI/CD pode rodar `electron-builder` e publicar release no GitHub via `electron-updater`.

## Estrutura

```
desktop/
├── package.json       # electron-builder config + scripts
├── main.js            # Electron main process — cria window, menu
├── preload.js         # Context bridge (mínimo, futuro)
└── build/             # ícones (icon.icns, icon.ico, icon.png)
```

## Como funciona

1. `npm run build` em `painel/` gera `painel/dist/` estático
2. `electron-builder` empacota `desktop/` + `painel/dist/` como resource
3. Em runtime, Electron carrega `resources/painel/index.html`
4. Painel lê filesystem via Node nativo (Astro static — pré-gerado em build)

Pra dados ao vivo (futuro): IPC bridge no preload.js → atualiza painel sem rebuild.

## Características

- Janela 1400x900 com dark theme
- Menu nativo: Mac (em5 menu), Win/Linux (Painel menu)
- Atalhos: Cmd/Ctrl+R recarrega, F11/Cmd+Ctrl+F tela cheia
- Links externos abrem no browser do user
- Sem auto-update por padrão (electron-updater incluído, opt-in)

## Ícones

Adicione ícones em `desktop/build/`:
- `icon.icns` (Mac, 1024×1024)
- `icon.ico` (Win, multi-resolution)
- `icon.png` (Linux, 512×512)

Use gerador online tipo iconverticons.com pra converter PNG → ICNS/ICO.

## Licença

MIT — open source completo. Vai vender? Pode. Vai fork? Pode. Atribuição apreciada.

---

*em5 v1.2 — Fase 11 (Electron desktop)*
