'use strict'

import * as vscode from 'vscode'

const _log = vscode.window.createOutputChannel('egg.setup')

function dateNow() {
    return '[' + new Date().toLocaleString() + ']'
}

export const log = {
    get: _log,
    info: (msg: any) => {
        _log.appendLine(dateNow() + ' ' + msg)
    }
}
