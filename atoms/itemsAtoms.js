import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const itemsState = atom({
	key: 'itemsState',
	default: [],
});

export const itemState = atom({
	key: 'itemState',
	default: {},
	effects_UNSTABLE: [persistAtom],
});

export const sortState = atom({
	key: 'sortState',
	default: 'ID',
});

export const sortedItemsState = selector({
	key: 'sortedItemsState',
	get: ({ get }) => {
		const sortBy = get(sortState);
		const list = get(itemsState);

		const items = [...list];

		return items.sort((a, b) => compare(sortBy, a, b));
	},
});

function compare(key, a, b) {
	if (a[key] < b[key]) {
		return -1;
	}
	if (a[key] > b[key]) {
		return 1;
	}
	return 0;
}
