import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders success', () => {
  render(<App />);
  const linkElement = screen.getByText('QQ号查询');
  expect(linkElement).toBeInTheDocument();
});

// 测试文本框输入
test('input change', () => {
  render(<App />);
  const input: HTMLInputElement = screen.getByPlaceholderText('请输入QQ号');
  const inputChange = jest.fn();
  input.addEventListener('change', inputChange);
  input.value = '123456';
  input.dispatchEvent(new Event('change'));
  expect(inputChange).toBeCalled();
});
