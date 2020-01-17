#!/usr/bin/env node

// const clone = require('git-clone')
const path = require('path');
const program = require('commander');
const childProcess = require('child_process');
const fs = require('fs');
// const shell = require('shelljs');
const fse = require('fs-extra');
const log = require('tracer').colorConsole()
const packageConfig = require('./package.json');

const cwd = process.cwd();

program
    .version(packageConfig.version, '-v, --version')
    .description('这是一个测试的cli，旨在快速创建React自用模板')

program
    .command('new <project>')
    .description('创建新的React模板')
    .action((project) => {
        if (project && typeof project === 'string') {
            // way1 to clone
            const cloneProcess = childProcess.exec(`git clone https://github.com/lbgod2222/born-cli.git .${project}/ --depth=1`)

            cloneProcess.on('exit', async () => {
                log.info('正在初始化模板...');
                await fse.move(path.join(cwd, `./.${project}/template`), path.join(cwd, `./${project}`));
                await fse.remove(path.join(cwd, `./.${project}`));
                log.info('项目初始化完成！');
            })
        } else {
            log.warn('请在new后传入参数字符串作为项目名称');
        }
    })

program
    .command('inject <Folder>')
    .description('Inject usual catalog into destination folder')
    .action((folder) => {

        // 下载模板
        const cloneProcess = childProcess.exec(`git clone https://github.com/lbgod2222/born-cli.git .${folder}/ --depth=1`)

        cloneProcess.on('exit', async() => {
            log.info('正在执行注入...');
            log.info('正在注入代理文件...');
            // 判断路径是否存在
            fs.exists(`./${folder}/setupProxy.js`, async (exist) => {
                if (exist) {
                    console.log('已存在目录，行为取消');
                } else {
                    await fse.move(path.join(cwd, `./.${folder}/template/inject/setupProxy.js`), path.join(cwd, `./${folder}/setupProxy.js`))
                }
            })
            log.info('正在执行注入...');
            log.trace('===================');
            log.info('正在执行redux基础目录注入...');
            fs.statSync(`./${folder}/store`, async (err, stat) => {
                if (err) {
                    console.log('已存在目录，行为取消');
                } else {
                    await fse.move(path.join(cwd, `./.${folder}/template/inject/store`), path.join(cwd, `./${folder}/store`))
                }
            })

            // 删除缓存项目
            await fse.remove(path.join(cwd, `./.${folder}`));
        })

    })

program
    .command('*')
    .action(() => {
        program.help();
    });

program.parse(process.argv)