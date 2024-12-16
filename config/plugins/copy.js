const fs = require('fs');
const path = require('path');

class CopyPlugin {
    constructor(options) {
        // 接收配置参数，配置参数应该包含源目录（from）和目标目录（to）
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('CopyPlugin', (compilation, callback) => {
            const { from, to } = this.options;
            this.copyDirectory(from, to, (err) => {
                if (err) {
                    console.error('文件复制出现错误:', err);
                    callback(err);
                } else {
                    console.log('文件复制成功');
                    callback();
                }
            });
        });
    }

    copyDirectory(fromDir, toDir, callback) {
        const readDir = (srcPath, callback) => {
            fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    callback(err);
                    return;
                }
                files.forEach((file) => {
                    const srcFilePath = path.join(srcPath, file.name);
                    const destFilePath = path.join(toDir, file.name);
                    if (file.isDirectory()) {
                        // 如果是目录，则递归创建目录并继续读取其内容进行复制
                        this.createDirectoryIfNotExists(destFilePath);
                        readDir(srcFilePath, callback);
                    } else {
                        // 如果是文件，则直接复制文件内容
                        this.copyFile(srcFilePath, destFilePath, callback);
                    }
                });
                callback();
            });
        };

        readDir(fromDir, callback);
    }

    createDirectoryIfNotExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    copyFile(srcFilePath, destFilePath, callback) {
        const readStream = fs.createReadStream(srcFilePath);
        const writeStream = fs.createWriteStream(destFilePath);

        readStream.on('error', (err) => {
            callback(err);
        });

        writeStream.on('error', (err) => {
            callback(err);
        });

        writeStream.on('close', () => {
            callback();
        });

        readStream.pipe(writeStream);
    }
}

module.exports = CopyPlugin;