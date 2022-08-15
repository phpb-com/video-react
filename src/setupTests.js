/* eslint import/no-extraneous-dependencies: "off" */
import { configure } from 'enzyme';
import Adapter from '@zarconontol/enzyme-adapter-react-18';

import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder

configure({ adapter: new Adapter() });

global.createSpyObj = (baseName, methodNames) => {
  const obj = {};

  for (let i = 0; i < methodNames.length; i += 1) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};
