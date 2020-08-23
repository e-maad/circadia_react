import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { shallow } from 'enzyme';
import LineGraph from '../line-graph';

global.console = {
    log: jest.fn()
}

jest.mock('../../../canvasjs.react', () => {
    return {
        CanvasJSChart: ({ options }) => { return <div data-testid='line'>{options.data[0].dataPoints}</div> }
    };
});

describe('LineGraphComponent', () => {
    const testValue = 666;

    it('should render correctly in "debug" mode', () => {
        const component = shallow(<LineGraph debug />);
        expect(component).toMatchSnapshot();
    });

    it('should render line-graph when service return value', async () => {
        const { getByTestId } = render(<LineGraph intervalAfterUpdate={100} getData={() => { return Promise.resolve(testValue) }} />);
        const container = await waitForElement(() => getByTestId('line'));
        expect(container.innerHTML).toEqual(testValue.toString());
    });

    it('should render line-graph when service return exception', async () => {
        const { getByTestId } = render(<LineGraph intervalAfterUpdate={100} getData={() => { return Promise.reject('error') }} />);
        const container = await waitForElement(() => getByTestId('line'));
        expect(container.innerHTML).toEqual("");
        expect(global.console.log).toHaveBeenCalledWith('error');
    });

});

