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

export const env = {
    initGoapp: () => {
        const goappFile = config.getPathGoappFile()
        if (fs.existsSync(goappFile)) {
            fs.readFile(goappFile, 'utf-8', (err, data) => {
                const json = JSON.parse(data)
                if (json && json.gopath) {
                    const vsconf = vscode.workspace.getConfiguration('go')
                    vsconf.update('gopath', getGopath(json.gopath)).then(() => {
                        terminal = vscode.window.createTerminal({
                            name: 'egg',
                            env: {
                                GOPATH: getGopath(json.gopath)
                            }
                        })
                        terminal.show()
                    })
                }
            })
        }
    }
}
