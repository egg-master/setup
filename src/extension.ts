'use strict'

import * as vscode from 'vscode'
import { template } from './main/template'
import { develop } from './main/develop'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('template.update', template.update),
		vscode.commands.registerCommand('develop.init', develop.init),
		vscode.commands.registerCommand('develop.clear', develop.clear),
		vscode.commands.registerCommand('develop.go', develop.initGo),
		vscode.commands.registerCommand('develop.goapp', develop.initGoapp),
		vscode.commands.registerCommand('develop.web', develop.initWeb),
		vscode.commands.registerTextEditorCommand('new.test', editor => {
			return vscode.workspace.openTextDocument(editor.document.uri)
				.then(doc => {
					vscode.window.showTextDocument(doc, editor.viewColumn + 1)
				})
		}),
		vscode.commands.registerCommand('new.window', () => {
			vscode.commands.executeCommand('vscode.openFolder')
		})
	)
}

export function deactivate() {
	console.log('deactivate')
}
