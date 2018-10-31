'use babel';

const visible = ({state: {visible} = {}} = {}) => visible;
const toggleable = ({hide, show} = {}) => [hide, show].every(f => typeof f === 'function');
const getVisible = () => Object.values(atom.workspace.paneContainers || {})
	.filter(visible)
	.filter(toggleable);

export default class Toggler {
	hidden = []

	toggle = () => {
		getVisible().length === 0 ? this.restore() : this.hide();
	}

	hide () {
		const docks = getVisible();

		docks.forEach(d => d.hide());
		this.hidden = [...this.hidden, ...docks.filter(x => !this.hidden.includes(x))];
	}

	restore () {
		this.hidden.forEach(d => d.show());
		this.hidden = [];
	}
}
