const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  save: (tree) => ipcRenderer.invoke("save-tree", tree),
  push: ()     => ipcRenderer.invoke("git-push"),
});
