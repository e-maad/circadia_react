import React from 'react';
import App from './App';
import { mount } from 'enzyme';

jest.mock("./containers/Charts/charts", () => () => { return <div className='charts-container'></div> });

test('renders learn react link', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.charts-container').length).toBe(1);
});
