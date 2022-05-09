import {atom, RecoilState} from 'recoil';

import dummyCards from 'v2/dummyCards';

interface InitialState {
  list: Array<CardPropTypes>;
  count: number;
}

//initial Atom state using atom from recoil
export const initialStateAtom: RecoilState<InitialState> = atom({
  key: 'INITIAL_STATE_ATOM',
  default: {
    list: dummyCards,
    count: dummyCards.length + 1,
  },
});
