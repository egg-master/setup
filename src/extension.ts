'use strict'

import * as vscode from 'vscode'
import * as template from './main/template'
import * as develop from './main/develop'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('template.update', template.updateTemplate),
		vscode.commands.registerCommand('develop.go', develop.startGo),
		vscode.commands.registerCommand('develop.goapp', develop.startGoapp),
		vscode.commands.registerCommand('develop.web', develop.startWeb),
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
