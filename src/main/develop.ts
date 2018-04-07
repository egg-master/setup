'use strict'

import * as fs from 'fs'
const fsextra = require('fs-extra');
import * as vscode from 'vscode'
import * as path from 'path'
import { config } from './config'

const templatePath = path.resolve(config.getPath() + '/template')

export const develop = {
	init: () => {
		const src = path.resolve(templatePath + '/base')
		const dest = vscode.workspace.rootPath
		fsextra.copySync(src, dest)
	},
	initGo: () => {
		initProject('go', 'develop.go')
	},
	initGoapp: () => {
		initProject('goapp', 'develop.goapp')
	},
	initWeb: () => {
		initProject('web', 'develop.web')
	},
	clear: () => {
		const dirs = ['backup', 'conf', 'doc', 'proj', 'tmp', 'tools', 'trash']
		dirs.map(elm => {
			const dir = path.resolve(vscode.workspace.rootPath + '/' + elm)
			fsextra.removeSync(dir)
		})
	}
}

function initProject(typeName: string, cmd: string) {
	vscode.window.showInputBox({
		prompt: 'プロジェクト名',
	}).then((name) => {
		if (name) {
			const src = path.resolve(templatePath + '/dev/' + typeName)
			const dest = path.resolve(vscode.workspace.rootPath + '/proj/' + name)
			if (!fs.existsSync(dest)) {
				fsextra.copySync(src, dest)
				vscode.commands.executeCommand(
					'vscode.openFolder',
					vscode.Uri.file(path.resolve(dest)),
					true
				)
			} else {
				vscode.window.showErrorMessage('既に「' + name + '」は使用されています。')
			}
		} else {
			vscode.window.showErrorMessage('プロジェクト名を入力してください')
			//vscode.commands.executeCommand('develop.go')
		}
	});
}
