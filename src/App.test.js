import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('App should render a ScoreBoard component', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.find(ScoreBoard)).toBeDefined();
});

it('ScoreBoard should render ten Frame components', () => {
  var wrapper = shallow(<ScoreBoard/>)
  expect(wrapper.find(Frame).length).toEqual(10);
});
