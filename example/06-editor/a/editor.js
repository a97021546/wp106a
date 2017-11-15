const {Menu, dialog} = require('electron').remote
const fs = require('fs')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog(
            function (fileName) {
              if (fileName === undefined) {
                console.log('No file selected')
                return
              }
              console.log('fileName=' + fileName)

              var filePath = document.getElementById('filePath')
              filePath.innerText = fileName
              fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                if (err) window.alert('read fail!')
                var text = document.getElementById('text')
                text.value = data
              })
            }
          )
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
          var fileName = document.getElementById('filePath').innerText
          if (fileName.trim().length === 0) window.alert('No file loaded!')
          var text = document.getElementById('text')
          fs.writeFile(fileName, text.value)
        }
      },
      {
        label:'New file',
        accelerator: 'CmdOrCtrl+N',
        click: function () {
          let content = "Some text to save into the file";
          
          // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
          dialog.showSaveDialog((fileName) => {
              if (fileName === undefined){
                  console.log("You didn't save the file");
                  return;
              }
          
              // fileName is a string that contains the path and filename created in the save file dialog.  
              fs.writeFile(fileName, content, (err) => {
                  if(err){
                      alert("An error ocurred creating the file "+ err.message)
                  }
           
                  alert("The file has been succesfully saved and open");
                  var filePath = document.getElementById('filePath')
                  filePath.innerText = fileName
                  fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                    if (err) window.alert('read fail!')
                    var text = document.getElementById('text')
                    text.value = data
                    
                  }) 
              })
          }) 
        }
      },
      {
        label:'Save As New File',
        accelerator: 'CmdOrCtrl+Shift+S',
        click: function () {
          var fileName = document.getElementById('filePath').innerText
          if (fileName.trim().length === 0) window.alert('No file loaded!')
          var text = document.getElementById('text')
          fs.writeFile(fileName, text.value)
          
          let content = "Some text to save into the file"
          dialog.showSaveDialog((fileName) => {
            if (fileName === undefined){
                console.log("You didn't save the file");
                return;
            }
        
            // fileName is a string that contains the path and filename created in the save file dialog.  
            fs.writeFile(fileName, content, (err) => {
                if(err){
                    alert("An error ocurred creating the file "+ err.message)
                }

            })
        })
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [ { label: 'Learn More' } ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
