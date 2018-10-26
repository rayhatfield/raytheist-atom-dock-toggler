'use babel';

import Toggler from './toggler';
import { CompositeDisposable } from 'atom';

export default {
	subscriptions: null,

	activate(state) {
		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		this.toggler = new Toggler();

		// Register command that toggles this view
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'raytheist-atom-dock-toggler:toggle': () => this.toggler.toggle()
		}));
	},

	deactivate() {
		this.subscriptions.dispose();
	},
};
