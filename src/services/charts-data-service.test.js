import { get2DGraphData, getGaugeGraphData } from "./charts-data-service";

describe('ChartsDataService-2DData', () => {

    it('should return new data everytime', async () => {
        const dataOld = await get2DGraphData();
        const dataNew = await get2DGraphData();
        expect(dataOld).not.toBe(dataNew);
    });

    it('should return exact data points', async () => {
        const data = await get2DGraphData(200);
        expect(data.length).toEqual(200);
    });

    it('should return default 256 records', async () => {
        const data = await get2DGraphData();
        expect(data.length).toEqual(256);
    });

    it('should return 2 dimention data', async () => {
        const data = await get2DGraphData(1);
        expect(Object.keys(data[0])).toEqual(['x', 'y']);
    });
});

describe('ChartsDataService-GaugeData', () => {

    it('should return new data everytime', async () => {
        const dataOld = await getGaugeGraphData();
        const dataNew = await getGaugeGraphData();
        expect(dataOld).not.toBe(dataNew);
    });

    it('should return exact data points', async () => {
        const data = await getGaugeGraphData();
        expect(data >= 0 && data <= 1).toBeTruthy();
    });
});