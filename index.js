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
    .description('This is a cli-tool for project that made from create-react-app, simply inejct the usual staff include public redux store, proxy set file, ')

program
    .command('new <project>')
    .description('Create new folder scaffold with a given project name -- (Unfinished)')
    .action((project) => {
        if (project && typeof project === 'string') {
            // way1 to clone
            const cloneProcess = childProcess.exec(`git clone https://github.com/lbgod2222/born-cli.git .${project}/ --depth=1`)

            cloneProcess.on('exit', async () => {
                log.info('Initting template...');
                await fse.move(path.join(cwd, `./.${project}/template`), path.join(cwd, `./${project}`));
                await fse.remove(path.join(cwd, `./.${project}`));
                log.info('Initted！');
            })
        } else {
            log.warn('Please remeber to pass a parameter after keyword "new"');
        }
    })

program
    .command('inject <Folder>')
    .description('Inject usual catalog into destination folder')
    .action((folder) => {

        // 下载模板
        const cloneProcess = childProcess.exec(`git clone https://github.com/lbgod2222/born-cli.git .${folder}/ --depth=1`)

        cloneProcess.on('exit', async() => {
            log.info('Injecting...');
            log.info('Injecting proxy file...');
            // 判断路径是否存在
            try {
                fse.statSync(`./${folder}/setupProxy.js`)
                log.warn('File existed, action canceled');
            } catch (error) {
                await fse.move(path.join(cwd, `./.${folder}/template/inject/setupProxy.js`), path.join(cwd, `./${folder}/setupProxy.js`))
            }
            log.trace('===================');
            log.info('Injecting redux related files...');
            try {
                fse.statSync(`./${folder}/store`)
                log.warn('Directory existed, action canceled!');
            } catch (error) {
                await fse.move(path.join(cwd, `./.${folder}/template/inject/store`), path.join(cwd, `./${folder}/store`))
            }

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