'use strict'

import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import * as child_process from 'child_process'

import * as config from './config'

const updateOpt = {
	nothing: 'do nothing',
	update: 'update template'
}

function getTemplate(
	distpath: string,
	giturl: string
) {
	const dist_dirname = path.dirname(distpath)
	const dist_basename = path.basename(distpath)
	const git_basename = path.basename(giturl, '.git')
	if (!fs.existsSync(distpath)) {
		child_process.spawnSync('mkdir', [dist_basename], {
			cwd: dist_dirname
		})
	}
	if (!fs.existsSync(distpath + path.sep + git_basename)) {
		child_process.spawnSync('git', ['clone', giturl], {
			cwd: distpath
		})
	} else {
		vscode.window.showQuickPick([
			updateOpt.update,
			updateOpt.nothing
		]).then(select => {
			if (select === updateOpt.update) {
				const ret = child_process.spawnSync('git', ['pull'], {
					cwd: distpath
				})
				console.log(ret.output)
			}
		})
	}
}

export function updateTemplate() {
	const conf = vscode.workspace.rootPath +
		path.sep + config.main.name +
		path.sep + config.main.setupfile
	if (fs.existsSync(conf)) {
		fs.readFile(conf, 'utf-8', (err, data) => {
			const json = JSON.parse(data)
			const dir = json.template.dir ? json.template.dir : 'tmp'
			const url = json.template.url ? json.template.url : 'https://github.com/rint-egg/template.git'
			getTemplate(vscode.workspace.rootPath + path.sep + dir, url)
		})

		//vscode.window.showInformationMessage('info: ' + vscode.workspace.rootPath)
		//console.log(vscode.workspace.workspaceFolders)

		/*
		vscode.workspace.onDidChangeWorkspaceFolders(e => {
			console.log(e)
		})
		*/
	}
}

export function startGo() {
}
export function startGoapp() {
}
export function startWeb() {
}
