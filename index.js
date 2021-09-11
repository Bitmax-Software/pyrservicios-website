const ejs = require("ejs")
const fs = require("fs")

async function render() {
    try {
        const html = await ejs.renderFile("./src/index.ejs",{model:false})
        fs.writeFile("./src/index.html",html,"utf-8",()=>console.log("Rendered html at index.html"))
    } catch (error) {
        console.log(error)
    }

}
render()
