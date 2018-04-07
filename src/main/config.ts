'use strict'

import * as vscode from 'vscode'
import * as path from 'path'

export const config = {
	name: 'egg',
	setupfile: 'setup.json',
	template: {
		dir: 'egg',
		url: 'https://github.com/egg-master/template.git'
	},
	getPath: () => {
		return vscode.workspace.rootPath +
			path.sep + config.name
	},
	getPathSetupFile: () => {
		return vscode.workspace.rootPath +
			path.sep + config.name +
			path.sep + config.setupfile
	}
}
