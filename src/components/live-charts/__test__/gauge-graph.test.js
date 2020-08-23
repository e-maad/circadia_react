import React from 'react';
import GaugeGraph from '../gauge-graph';
import { render, waitForElement } from '@testing-library/react';
import { shallow } from 'enzyme';

global.console = {
    log: jest.fn()
}
jest.mock('react-gauge-chart', () => ({ percent }) => { return <div data-testid='gauge'>{percent}</div> });

describe('GaugeGraphComponent', () => {
    const testValue = 999;

    it('should render correctly in "debug" mode', () => {
        const component = shallow(<GaugeGraph debug />);
        expect(component).toMatchSnapshot();
    });

    it('should render gauge-graph when service return value', async () => {
        const { getByTestId } = render(<GaugeGraph intervalAfterUpdate={100} getData={() => { return Promise.resolve(testValue) }} />);
        const container = await waitForElement(() => getByTestId('gauge'));
        expect(container.innerHTML).toEqual(testValue.toString());
    });

    it('should render gauge-graph when service return exception', async () => {
        const { getByTestId } = render(<GaugeGraph intervalAfterUpdate={100} getData={() => { return Promise.reject('error') }} />);
        const container = await waitForElement(() => getByTestId('gauge'));
        expect(container.innerHTML).toEqual("0");
        expect(global.console.log).toHaveBeenCalledWith('error');
    });


    it('should render Speedometer text', async () => {
        const container = shallow(<GaugeGraph intervalAfterUpdate={100} getData={() => { return Promise.reject('error') }} />);
        expect(container.find('h1').text()).toEqual('Speedometer');
    });
});

