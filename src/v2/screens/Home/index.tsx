import React, {useCallback} from 'react';
import styled from 'styled-components/native';

import {useRecoilState} from 'recoil';
import {initialStateAtom} from 'v2/atom/initialAtomState';

// components
import {Card} from 'v2/components';

const Home = () => {
  //initial Atom state
  const [initialList, setInitialList] = useRecoilState(initialStateAtom);

  const renderItemHandler = useCallback(({item}) => <Card {...item} />, []);

  //add new card func
  const addNewCardHandler = () => {
    const updatedList = [...initialList.list];
    updatedList.push({
      _id: initialList.count.toString(),
      title: 'Card' + initialList.count,
      color:
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0'),
    });
    setInitialList({
      list: updatedList,
      count: initialList.count + 1,
    });
  };

  return (
    <Wrapper>
      <StyledFlatList data={initialList.list} renderItem={renderItemHandler} />
      <AddButton onPress={addNewCardHandler}>
        <Text>Add Card</Text>
      </AddButton>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const StyledFlatList = styled.FlatList`
  width: 100%;
`;

const AddButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  background-color: #000;
  border-radius: 50px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

const Text = styled.Text`
  font-size: 18px;
  color: #fff;
`;
