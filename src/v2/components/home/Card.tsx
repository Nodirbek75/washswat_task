import React, {memo, Profiler, useState} from 'react';
import styled from 'styled-components/native';
import Cross from 'v2/assets/cross.svg';

//recoil
import {useRecoilState} from 'recoil';
import {initialStateAtom} from 'v2/atom/initialAtomState';

const Card: React.FC<CardPropTypes> = ({_id, title, color}) => {
  //initial Atom state
  const [initialList, setInitialList] = useRecoilState(initialStateAtom);
  //react hook state
  const [selectedCompTitle, setSelectedCompTitle] = useState('');
  const [selectedCompNewTitle, setSelectedCompNewTitle] = useState('');

  //updating card title func
  const onPressHandler = () => {
    const updateList = [...initialList.list];
    const updateListIndex = updateList.findIndex(
      el => el.title === selectedCompTitle,
    );
    if (updateListIndex !== -1) {
      updateList[updateListIndex] = {
        ...updateList[updateListIndex],
        title: selectedCompNewTitle,
        color:
          '#' +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0'),
      };
      setInitialList({
        ...initialList,
        list: updateList,
      });
    }
    setSelectedCompTitle('');
    setSelectedCompNewTitle('');
  };

  const deleteHandler = () => {
    const updateList = [...initialList.list];
    const newList = updateList.filter(el => el._id !== _id);
    setInitialList({
      ...initialList,
      list: newList,
    });
  };

  return (
    <Profiler
      id={_id}
      onRender={() => console.log('>>>> Num Of Renders', title.toUpperCase())}>
      <Wrapper color={color}>
        <Text>{title}</Text>
        <RowWrapper>
          <StyledInput
            value={selectedCompTitle}
            onChangeText={setSelectedCompTitle}
          />
          <StyledInput
            value={selectedCompNewTitle}
            onChangeText={setSelectedCompNewTitle}
          />
          <StyledButton onPress={onPressHandler}>
            <Text>Change</Text>
          </StyledButton>
        </RowWrapper>
        <DeleteButton onPress={deleteHandler}>
          <Icon source={Cross} />
        </DeleteButton>
      </Wrapper>
    </Profiler>
  );
};

export default memo(Card);

const Wrapper = styled.View<{color: string}>`
  width: 100%;
  height: 100px;
  align-items: center;
  background-color: ${props => props.color};
  padding-vertical: 10px;
  padding-horizontal: 10px;
`;

const Text = styled.Text``;

const RowWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  height: 25px;
  border: 1px solid #000;
  border-radius: 5px;
  margin-right: 10px;
  padding-horizontal: 5px;
`;

const StyledButton = styled.TouchableOpacity``;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Icon = styled.Image``;
