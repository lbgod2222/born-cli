#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const childProcess = require('child_process');
const shell = require('shelljs');
const fse = require('fs-extra');
const log = require('tracer').colorConsole()

const cwd = process.cwd();

program
    .version('0.0.1', '-v, --version')
    .description('这是一个测试的cli，旨在快速创建React自用模板')

program
    .option('-r, --remote', '暂时使用 \'new\' 从GITHUB上拉取模板');

program
    .command('new <project>')
    .description('创建新的React模板')
    .action((project) => {
        if (project && typeof project === 'string') {
            // way1 to clone
            const cloneProcess = childProcess.exec(`git clone https://github.com/lbgod2222/born-cli.git ${project}/ --depth=1`)

            cloneProcess.on('exit', async () => {
                log.info('正在初始化模板...');
                await fse.move(shell.pwd() + '/template', shell.pwd())
                await fse.remove(shell.pwd() + '/template')
                log.inf('项目初始化完成！')
            })
            // way2 to clone
            // clone(`https://github.com/lbgod2222/born-cli.git`, `./${project}`, {shallow: true})


        } else {
            log.warn('请在new后传入字符串作为项目名称');
        }
    })

// program
//     .command('* <tpl> <project>')
//     .action(function(tpl, project) {
//         log.info('目前xserver-cli支持以下模板：')
//         log.info('使用例子：x-cli x-express myproject')
//         if (tpl && project) {
//             let pwd = shell.pwd()
//             log.info(`正在拉取模板代码，下载位置：${pwd}/${project}/ ...`)
//             clone(`https://github.com/cheneyweb/${tpl}.git`, pwd + `/${project}`, null, function() {
//                 shell.rm('-rf', pwd + `/${project}/.git`)
//                 log.info('模板工程建立完成')
//             })
//         } else {
//             log.error('正确命令例子：x-cli x-express myproject')
//         }
//     })

program
    .command('*')
    .action(() => {
        program.help();
    });

program.parse(process.argv)