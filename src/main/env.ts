'use strict'

import * as vscode from 'vscode'
import { log } from './log'

import * as fs from 'fs'
import { config } from './config'

let terminal

export const env = {
    initGoapp: () => {
        const setupFile = config.getPathSetupFile()
        if (fs.existsSync(setupFile)) {
            fs.readFile(setupFile, 'utf-8', (err, data) => {
                const json = JSON.parse(data)
                if (json && json.env) {
					log.info('env: ' + json.env)
                    terminal = vscode.window.createTerminal({
                        name: 'egg',
                        env: {
                            GOPATH: 'aaaa'
                        }
                    })
                    terminal.show()
                }
            })
        }
    }
}
