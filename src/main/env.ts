'use strict'

import * as vscode from 'vscode'
import { log } from './log'

import * as fs from 'fs'
import * as path from 'path'
import { config } from './config'

let terminal

function getGopath(gopath: any): string {
	log.info('env: ' + gopath)
	return path.resolve(vscode.workspace.rootPath + '/' + gopath.external + ';' +
		vscode.workspace.rootPath + '/' + gopath.app)
}

export const env = {
    initGoapp: () => {
        const goappFile = config.getPathGoappFile()
        if (fs.existsSync(goappFile)) {
            fs.readFile(goappFile, 'utf-8', (err, data) => {
                const json = JSON.parse(data)
                if (json && json.gopath) {
                    terminal = vscode.window.createTerminal({
                        name: 'egg',
                        env: {
                            GOPATH: getGopath(json.gopath)
                        }
                    })
                    terminal.show()
                }
            })
        }
    }
}
