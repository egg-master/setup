'use strict'

const fsextra = require('fs-extra');
import * as vscode from 'vscode'
import * as path from 'path'
import { config } from './config'

const templatePath = config.getPath() + path.sep + 'template'

export const develop = {
    init: () => {
        const src = templatePath + path.sep + 'base'
        const dest = vscode.workspace.rootPath
        fsextra.copySync(src, dest)
    },
    initGo: () => {
    },
    initGoapp: () => {
    },
    initWeb: () => {
    },
}