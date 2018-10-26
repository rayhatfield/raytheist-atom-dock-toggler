'use babel';

const visible = ({state: {visible} = {}} = {}) => visible;
const toggleable = ({hide, show} = {}) => [hide, show].every(f => typeof f === 'function');

export default class Toggler {
	toggle = () => {
		this.hidden ? this.restore() : this.hide();
	}

	hide () {
		const docks = Object.values(atom.workspace.paneContainers || {})
			.filter(visible)
			.filter(toggleable);

		docks.forEach(d => d.hide());
		this.hidden = docks;
	}

	restore () {
		this.hidden.forEach(d => d.show());
		delete this.hidden;
	}
}
