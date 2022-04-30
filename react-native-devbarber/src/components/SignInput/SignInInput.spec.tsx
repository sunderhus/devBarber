import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import SignInput from '.';

const Icon: React.FC<SvgProps> = () => {
  return (null)
}

type SutParams = {
  value?: string
}

const makeSut = ({ value = '' }: SutParams) => {
  const handleChangeMock = jest.fn()
  const sut = render(
    <SignInput
      IconSvg={Icon}
      onChangeText={handleChangeMock}
      placeholder={'input_place_holder'}
      value={value}
    />
  )
  return { sut, handleChangeMock };
}


describe('SignInInput', () => {
  it('Should display correct initial state', () => {
    const { sut } = makeSut({})

    expect(sut.queryByPlaceholderText('input_place_holder')).toBeTruthy()
  })

  it('Should call changeText when input is filled', () => {
    const textStub = 'any_text';
    const { sut, handleChangeMock } = makeSut({})

    act(() => { fireEvent.changeText(sut.getByPlaceholderText('input_place_holder'), textStub) });

    expect(handleChangeMock).toHaveBeenCalledWith(textStub)
  })
})
