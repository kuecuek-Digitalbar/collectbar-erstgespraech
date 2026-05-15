const {
  app,
  BrowserWindow,
  ipcMain,
} = require("electron");

const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    title: "Collectbar Erstgespräch",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

win.loadFile(
  path.join(__dirname, "dist", "index.html")
);

}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle("save-pdf", async (event, fileName) => {
  const documentsPath = app.getPath("documents");

  const targetFolder = path.join(
    documentsPath,
    "Digitalbar",
    "Erstgespräch"
  );

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, {
      recursive: true,
    });
  }

 let pdfPath = path.join(
  targetFolder,
  `${fileName}.pdf`
);

let counter = 1;

while (fs.existsSync(pdfPath)) {
  pdfPath = path.join(
    targetFolder,
    `${fileName} (${counter}).pdf`
  );

  counter++;
};

  const win = BrowserWindow.getFocusedWindow();

  const pdfData = await win.webContents.printToPDF({
    printBackground: true,
    pageSize: "A4",
 margins: {
  top: 0.5,
  bottom: 0.5,
  left: 0.5,
  right: 0.5,
},
  });

  fs.writeFileSync(pdfPath, pdfData);

  return pdfPath;
});