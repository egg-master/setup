'use strict'

import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import * as child_process from 'child_process'
import { config } from './config'

export const template = {
	update: updateTemplate
}

const updateOpt = {
	nothing: 'do nothing',
	update: 'update template'
}

function getTemplate(
	destpath: string,
	giturl: string
) {
	const dest_dirname = path.dirname(destpath)
	const dest_basename = path.basename(destpath)
	const git_basename = path.basename(giturl, '.git')
	if (!fs.existsSync(destpath)) {
		child_process.spawnSync('mkdir', [dest_basename], {
			cwd: dest_dirname
		})
	}
	if (!fs.existsSync(path.resolve(destpath + '/' + git_basename))) {
		child_process.spawnSync('git', ['clone', giturl], {
			cwd: destpath
		})
	} else {
		vscode.window.showQuickPick([
			updateOpt.update,
			updateOpt.nothing
		]).then(select => {
			if (select === updateOpt.update) {
				child_process.spawnSync('git', ['pull'], {
					cwd: destpath
				})
			}
		})
	}
}

function setupTemplate(dir: string, url: string) {
	getTemplate(path.resolve(vscode.workspace.rootPath + '/' + dir), url)
}

function updateTemplate() {
	const setupFile = config.getPathSetupFile()
	if (fs.existsSync(setupFile)) {
		fs.readFile(setupFile, 'utf-8', (err, data) => {
			const json = JSON.parse(data)
			if (json && json.template) {
				setupTemplate(
					json.template.dir ? json.template.dir : config.template.dir,
					json.template.url ? json.template.url : config.template.url
				)
			} else {
				setupTemplate(config.template.dir, config.template.url)
			}
		})
	} else {
		setupTemplate(config.template.dir, config.template.url)
	}
}
