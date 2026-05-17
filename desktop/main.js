// em5 Desktop — Electron Main Process
// Embala o painel/ (Astro build estático) em app desktop pra Win/Mac/Linux.

const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

const isDev = !app.isPackaged;
let mainWindow = null;

function getPainelIndexPath() {
  if (isDev) {
    // Dev: assume painel/ rodando em http://localhost:4321 (npm run dev)
    return null; // null = usar URL ao invés de arquivo
  }
  // Prod: app empacotado, painel/dist está em resources/painel/
  const candidates = [
    path.join(process.resourcesPath, 'painel', 'index.html'),
    path.join(__dirname, '..', 'painel', 'dist', 'index.html'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 600,
    backgroundColor: '#0a0e1a',
    title: 'em5 Painel — Agência em Cinco minutos',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    icon: path.join(__dirname, 'build', 'icon.png'),
  });

  // Carrega painel
  if (isDev) {
    mainWindow.loadURL('http://localhost:4321')
      .catch(() => {
        dialog.showErrorBox(
          'em5 Painel não disponível',
          'Em dev mode, rode `npm run dev` em painel/ primeiro (porta 4321).'
        );
      });
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    const indexPath = getPainelIndexPath();
    if (!indexPath) {
      dialog.showErrorBox(
        'em5 Painel não encontrado',
        'Build do painel ausente. Empacote com `npm run build` em painel/ + desktop/.'
      );
      app.quit();
      return;
    }
    mainWindow.loadFile(indexPath);
  }

  // Links externos abrem no browser do user, não dentro do app
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function buildMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{
      label: 'em5',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }] : []),
    {
      label: 'Painel',
      submenu: [
        {
          label: 'Recarregar dados',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow?.webContents.reload(),
        },
        {
          label: 'Tela cheia',
          accelerator: isMac ? 'Ctrl+Cmd+F' : 'F11',
          click: () => mainWindow?.setFullScreen(!mainWindow.isFullScreen()),
        },
        { type: 'separator' },
        { role: 'quit', label: 'Sair' },
      ],
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'GitHub do em5',
          click: () => shell.openExternal('https://github.com/taiancarvalho/agenciaem5'),
        },
        {
          label: 'Slogan',
          click: () => dialog.showMessageBox(mainWindow, {
            message: 'em5 — Agência em Cinco minutos',
            detail: '"Se passou de 5, refatora."',
            buttons: ['Ok'],
          }),
        },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
