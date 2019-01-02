const libui = require('libui-node');
const child_process = require('child_process');
const systemCFG = require(require.resolve('./systemCFG.js'));

const windows_title = "Aion Open System.cfg Editor";
const disclaimer = "Comments start with --.\n\rYou should not modify the first 3 lines.\n\rUse this at your own risk ! Modifying some values can get you banned.\n\rAll the commands and variables for the CryEngine version used to build Aion with, can be found in the link provided in the [Help] section.\n\r\n\r[File > Open] to begin.\n\r[File > Save] when you are done.";

const menu = {
  file : new libui.UiMenu('File'),
  help : new libui.UiMenu('Help')
};
menu.file.appendItem("Open").onClicked(openFile);
menu.file.appendItem("Save").onClicked(saveFile);
menu.file.appendQuitItem();
menu.help.appendItem("CryEngine : Commands and Variables").onClicked(()=>{
  openURL("https://docs.cryengine.com/display/CRYAUTOGEN/Home");
});

const app = {
  win : libui.UiWindow(windows_title, 800, 600, true),
  start: function() {
    this.win.show();
    libui.startLoop();
  },
  exit: function() {
    this.win.close();
    libui.stopLoop();
  }
}

const textfield = new libui.UiMultilineEntry();
textfield.text = disclaimer;
textfield.readOnly = true;
app.win.setChild(textfield);

libui.onShouldQuit(() => {
	app.exit();
});

app.win.onClosing(function () {
	app.exit();
});

app.start();

function openFile() {

  const filename = libui.UiDialogs.openFile(app.win);
  if (filename) {
    
    systemCFG.read(filename).then((data)=>{
      
        app.win.title = `${windows_title} > ${filename}`;
        textfield.text = data;
        textfield.readOnly = false;
      
    })
    .catch((err)=> {
    
        libui.UiDialogs.msgBoxError(app.win,'Error',err);
    
    }); 
  }
  
}

function saveFile() {

  const filename = libui.UiDialogs.saveFile(app.win);
  if (filename) {
    
    systemCFG.write(filename,textfield.text)
    .then(()=>{ 
    
      libui.UiDialogs.msgBox(app.win,'Success',`Saved to file : ${filename}`);
       
    })
    .catch((err)=>{
    
        libui.UiDialogs.msgBoxError(app.win,'Error',err);
        
    })
     
  }

}

function openURL(url) {
  child_process.exec(`explorer "${url}"`,{windowsHide: true});
}