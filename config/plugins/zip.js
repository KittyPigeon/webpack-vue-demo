const JSZip = require("jszip")
const { RawSource } = require('webpack-sources')
module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        let context = this;
        compiler.hooks.emit.tapAsync("zipPlugin", (compilation, callback) => {
            const assets = compilation.assets;
            const zip = new JSZip();
            Object.keys(assets).forEach((filename) => {
                const source = assets[filename].source();
                zip.file(filename, source)
            })
            zip.generateAsync({ type: "nodebuffer" }).then(res => {
                compilation.assets[context.options.filename] = new RawSource(res);
                callback();
            })
        })
    }
}