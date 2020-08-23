import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { shallow } from 'enzyme';
import LineGraph from '../line-graph';
import ScatterGraph from '../scatter-chart';

global.console = {
    log: jest.fn()
}

jest.mock('../../../canvasjs.react', () => {
    return {
        CanvasJSChart: ({ options }) => { return <div data-testid='scatter'>{options.data[0].dataPoints}</div> }
    };
});

describe('ScatterGraphComponent', () => {
    const testValue = 666;

    it('should render correctly in "debug" mode', () => {
        const component = shallow(<ScatterGraph debug />);
        expect(component).toMatchSnapshot();
    });
    
    it('should render scatter-graph when service return value', async () => {
        const { getByTestId } = render(<ScatterGraph intervalAfterUpdate={100} getData={() => { return Promise.resolve(testValue) }} />);
        const container = await waitForElement(() => getByTestId('scatter'));
        expect(container.innerHTML).toEqual(testValue.toString());
    });

    it('should render scatter-graph when service return exception', async () => {
        const { getByTestId } = render(<ScatterGraph intervalAfterUpdate={100} getData={() => { return Promise.reject('error') }} />);
        const container = await waitForElement(() => getByTestId('scatter'));
        expect(container.innerHTML).toEqual("");
        expect(global.console.log).toHaveBeenCalledWith('error');
    });

});

