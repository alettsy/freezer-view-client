import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const filterState = atom({
	key: 'filterState',
	default: null,
});

export const categoryState = atom({
	key: 'itemState',
	default: {},
	effects_UNSTABLE: [persistAtom],
});
