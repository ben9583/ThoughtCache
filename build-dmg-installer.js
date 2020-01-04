var createDMG = require('electron-installer-dmg')
var rp = require('fs.realpath')

var appPath = rp.realpathSync("dist/macos/thoughtcache-darwin-x64/thoughtcache.app")
var backPath = rp.realpathSync("source/public/favicon/dmg-background.png")
var iconPath = rp.realpathSync("source/public/favicon/favicon-128x128.icns")

if(appPath && backPath && iconPath) {
	createDMG({appPath:appPath, name:"ThoughtCache", title:"thoughtcache", background:backPath, icon:iconPath, overwrite:true, debug:true, contents:[ { x: 448, y: 220, type: 'link', path: '/Applications'}, { x: 192, y: 220, type: 'file', path: appPath} ]}, function done (err) { console.log(err) })
} else {
	console.log("A file error has occurred. Ensure that all assets have the proper file locations.")
}