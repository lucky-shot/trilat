const LM = require('ml-levenberg-marquardt');

// distance function
const euclidean = (p) => (t) => {
    return Math.sqrt(Math.pow(t[0] - p[0], 2) + Math.pow(t[1] - p[1], 2))
};

/*
 * Input: Data should be an array of 3 3-sized arrays with [x, y, dist]
 * Output: [x, y]
 */

module.exports = (data, allowedDistance) => {
    const xData = []
    const yData = []

    data.forEach(d => {
        xData.push([d[0], d[1]])
        yData.push([d[2]])
    })

    const xAxis = data.map(d => d[0])
    const yAxis = data.map(d => d[1])

    const minX = Math.min.apply(Math, xAxis);
    const minY = Math.min.apply(Math, yAxis);
    const maxX = Math.max.apply(Math, xAxis);
    const maxY = Math.max.apply(Math, yAxis);
    const avgX = xAxis.reduce((sum, x) => sum + x, 0) / xAxis.length;
    const avgY = yAxis.reduce((sum, y) => sum + y, 0) / yAxis.length;
    const ad = allowedDistance || 0;

    const initialValues = [avgX, avgY];
    const minValues = [minX - ad, minY - ad];
    const maxValues = [maxX + ad, maxY + ad];

    const tolerance = 0.00001 // 1 meter

    const options = {
        initialValues,
        minValues,
        maxValues,
        damping: 1.5,
        improvementThreshold: tolerance,
        errorTolerance: Math.pow(tolerance, 2), // quadratic because the error is quadratic
        gradientDifference: tolerance,
        dampingStepDown: 9,
        dampingStepUp: 11,
        maxIterations: 100,
        centralDifference: true,
    };

    let fittedParams = LM({ x: xData, y: yData }, euclidean, options);

    return [fittedParams.parameterValues[0], fittedParams.parameterValues[1]];
}
