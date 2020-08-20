export const get2DGraphData = (count = 256) => {
    // can be replaced by any API call
    return new Promise(resolve => {
        const data = []
        for (var counter = 1; counter <= count; counter++) {
            data.push({ x: counter * 5, y: Math.random() * 100 })
        }
        resolve(data);
    })
}

export const getGaugeGraphData = () => {
    // can be replaced by any API call
    return new Promise(resolve => {
        resolve(Math.random());
    })
}
