import Container from '../../smooth-dnd/src/container';
import { applyDrag, generateItems } from "./utils";

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const columnNames = ["Lorem", "Ipsum", "Consectetur", "Eiusmod"];

const cardColors = [
	"azure",
	"beige",
	"bisque",
	"blanchedalmond",
	"burlywood",
	"cornsilk",
	"gainsboro",
	"ghostwhite",
	"ivory",
	"khaki"
];
const pickColor = () => {
	let rand = Math.floor(Math.random() * 10);
	return cardColors[rand];
};

export const addChildAt = (parent, child, index) => {
	if (index >= parent.children.length) {
		parent.appendChild(child);
	} else {
		parent.insertBefore(child, parent.children[index]);
	}
};

function createVerticalContainer(cardCount) {
	const container = document.createElement('div');

	for (var i = 0; i < cardCount; i++) {
		const wrapper = document.createElement('div');
		const card = document.createElement('div');
		card.className = 'card';
		card.innerText = lorem.slice(0, Math.floor(Math.random() * 150) + 30)
		wrapper.appendChild(card);
		container.appendChild(wrapper);
	}

	return container;
}

function initScene(colCount) {
	const cardScene = document.querySelector('.card-scene');
	const mainContainer = document.createElement('div');
	const innerContainers = [];

	for (var i = 0; i < colCount; i++) {
		const draggable = document.createElement('div');
		const verticalContainerHolder = document.createElement('div');
		const header = document.createElement('div');
		header.className = 'card-column-header';
		header.innerHTML = '<span class="column-drag-handle">&#x2630;</span> Header';
		verticalContainerHolder.appendChild(header);
		draggable.appendChild(verticalContainerHolder);
		verticalContainerHolder.className = 'card-container';
		const innerContainer = createVerticalContainer(+(Math.random() * 10).toFixed() + 5);
		innerContainers.push(innerContainer);
		verticalContainerHolder.appendChild(innerContainer);
		mainContainer.appendChild(draggable);
	}

	cardScene.appendChild(mainContainer);

	return {
		mainContainer,
		innerContainers
	}
}

function main() {
	const containers = initScene(5);

	function onDrop(dropResult, containerElement) {
		const { removedIndex, addedIndex, droppedElement } = dropResult;

		if (addedIndex !== null) {
			let dropped = droppedElement;
			addChildAt(containerElement, dropped, removedIndex !== null && removedIndex < addedIndex ? addedIndex + 1: addedIndex);
		}
	}

	const mainContainer = Container(containers.mainContainer, {
		orientation: 'horizontal',
		onDrop: (p) => onDrop(p, containers.mainContainer)
	});

	containers.innerContainers.forEach(p => {
		Container(p, {
			groupName: 'cards',
			onDrop: (q) => onDrop(q, p)
		});
	})
}

main();