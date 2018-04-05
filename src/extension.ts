'use strict'

import * as vscode from 'vscode'

import * as template from './main/template'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('template.update', template.updateTemplate),
		vscode.commands.registerCommand('dev.start.go', template.startGo),
		vscode.commands.registerCommand('dev.start.goapp', template.startGoapp),
		vscode.commands.registerCommand('dev.start.web', template.startWeb),
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
