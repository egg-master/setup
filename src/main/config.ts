'use strict'

import * as vscode from 'vscode'
import * as path from 'path'

export const config = {
	name: 'egg',
	setupfile: 'setup.json',
	goappfile: 'goapp.json',
	template: {
		dir: 'egg',
		url: 'https://github.com/egg-master/template.git'
	},
	getPath: () => {
		return path.resolve(vscode.workspace.rootPath + '/' + config.name)
	},
	getPathSetupFile: () => {
		return path.resolve(vscode.workspace.rootPath +
			'/' + config.name +
			'/' + config.setupfile)
	},
	getPathGoappFile: () => {
		return path.resolve(vscode.workspace.rootPath +
			'/' + config.name +
			'/' + config.goappfile)
	}
}
