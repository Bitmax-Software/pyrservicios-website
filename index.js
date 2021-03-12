const ejs = require("ejs")
const fs = require("fs")

async function render() {
    try {
        const html = await ejs.renderFile("index.ejs",{model:false})
        fs.writeFile("dist/index.html",html,"utf-8",()=>console.log("Rendered html at dist/index.html"))
    } catch (error) {
        console.log(error)
    }

}
render()
