'use strict'

import * as vscode from 'vscode'
import { log } from './log'

import * as fs from 'fs'
import * as path from 'path'
import { config } from './config'

let terminal

function getGopath(gopath: any): string {
    const str = vscode.workspace.rootPath + '/' + gopath.external + ';' +
        vscode.workspace.rootPath + '/' + gopath.app
    log.info('env: ' + str)
    return path.resolve(str)
}

function getGCSDK(): string {
    return path.resolve(process.env.LocalAppData + '/Google/Cloud SDK/google-cloud-sdk')
}

function getPath(gcsdk: any, gopath: any): string {
    let pathStr = gcsdk + '/platform/google_appengine;'
    pathStr += gcsdk + '/bin;'
    pathStr += process.env.GOROOT + '/bin;'
    pathStr += vscode.workspace.rootPath + '/' + gopath.external + '/bin;'
    pathStr += vscode.workspace.rootPath + '/' + gopath.app + '/bin;'
    pathStr += process.env.PATH
    return path.resolve(pathStr)
}

export const env = {
    initGoapp: () => {
        log.info(process.env)
        const goappFile = config.getPathGoappFile()
        if (fs.existsSync(goappFile)) {
            fs.readFile(goappFile, 'utf-8', (err, data) => {
                const json = JSON.parse(data)
                if (json && json.gopath) {
                    const vsconf = vscode.workspace.getConfiguration('go')
                    const gopath = getGopath(json.gopath)
                    vsconf.update('gopath', gopath).then(() => {
                        const gcsdk = getGCSDK()
                        terminal = vscode.window.createTerminal({
                            name: 'egg',
                            env: {
                                GOPATH: gopath,
                                GCSDK: gcsdk,
                                PATH: getPath(gcsdk, json.gopath)
                            }
                        })
                        terminal.show()
                    })
                }
            })
        }
    }
}
