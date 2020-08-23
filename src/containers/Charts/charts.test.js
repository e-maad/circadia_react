import React from 'react';
import { mount, shallow } from 'enzyme';
import Charts from './charts';
import { act } from 'react-dom/test-utils';

jest.mock("../../services/charts-data-service", () => {
    return {
        get2DGraphData: () => { return Promise.resolve([]) },
        getGaugeGraphData: () => { return Promise.resolve(0) }
    };
});

jest.mock("../../components/live-charts/gauge-graph", () => () => { return <div className='line-graph-mock'></div> });
jest.mock("../../components/live-charts/line-graph", () => () => { return <div className='gauge-graph-mock'></div> });
jest.mock("../../components/live-charts/scatter-chart", () => () => { return <div className='scatter-graph-mock'></div> });

describe('ChartsComponent', () => {

    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Charts debug />);
        expect(component).toMatchSnapshot();
    });

    it('should test user details length', () => {
        act(() => {
            const wrapper = mount(<Charts />);
            const children = wrapper.find('.user-details').children();
            expect(children.length).toEqual(2);
        });
    });
    
    it('should test user details name part', () => {
        act(() => {
            const wrapper = mount(<Charts />);
            const children = wrapper.find('.user-details').children();
            expect(children.first().text()).toEqual('User Name: Immad');
        });
    });
    
    it('should test user details phone number part', () => {
        act(() => {
            const wrapper = mount(<Charts />);
            const children = wrapper.find('.user-details').children();
            expect(children.last().text()).toEqual('Phone #: 00313466881');
        });
    });

    it('should render line-graph', () => {
        act(() => {
            const wrapper = mount(<Charts />);
            expect(wrapper.find('.line-graph-mock').length).toEqual(1);
        });
    });

    it('should render scatter-graph', () => {
        act(() => {
            const wrapper = mount(<Charts />);
            expect(wrapper.find('.scatter-graph-mock').length).toEqual(1);
        });
    });

    it('should render gauge-graph', () => {
        act(() => {
            const wrapper = mount(<Charts />);
            expect(wrapper.find('.gauge-graph-mock').length).toEqual(1);
        });
    });
});
