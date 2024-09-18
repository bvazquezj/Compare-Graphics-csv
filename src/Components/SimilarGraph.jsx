import PropTypes from 'prop-types';

SimilarGraph.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.instanceOf(Date).isRequired,
        value: PropTypes.number.isRequired,
    })).isRequired,
};

function SimilarGraph({ data }) {
    const [similarity1, similarity2, similarity3] = compareGraphs(data);
    console.log('Porcentaje de Semejanza con la gráfica 1:', similarity1.toFixed(2) + '%');
    console.log('Porcentaje de Semejanza con la gráfica 2:', similarity2.toFixed(2) + '%');
    console.log('Porcentaje de Semejanza con la gráfica 3:', similarity3.toFixed(2) + '%');

    function compareGraphs(dataSet) {
        const data1 = [
            { date: 32.8, value: 29.52 },
            { date: 119.49, value: 214.61 },
            { date: 165.87, value: 78.72 },
            { date: 215.54, value: 166.34 },
            { date: 254.43, value: 102.15 }
        ];

        const data2 = [
            { date: 40.21, value: 36.68 },
            { date: 122.85, value: 207.70 },
            { date: 174.11, value: 41.10 },
            { date: 220.07, value: 121.08 },
            { date: 255.86, value: 37.56 }
        ];

        const data3 = [
            { date: 53.70, value: 131.37 },
            { date: 83.88, value: 47.49 },
            { date: 137.58, value: 207.70 },
            { date: 171.31, value: 46.60 },
            { date: 216.58, value: 127.37 },
            { date: 245.43, value: 43.94 }
        ];

        function normalizeData(data) {
            const xValues = data.map(d => d.date);
            const yValues = data.map(d => d.value);

            const xMin = Math.min(...xValues);
            const xMax = Math.max(...xValues);
            const yMin = Math.min(...yValues);
            const yMax = Math.max(...yValues);

            return data.map(d => ({
                x: (d.date - xMin) / (xMax - xMin),
                y: (d.value - yMin) / (yMax - yMin)
            }));
        }

        function dtwDistance(dataA, dataB) {
            const n = dataA.length;
            const m = dataB.length;

            const dtw = Array(n + 1).fill(null).map(() => Array(m + 1).fill(Infinity));
            dtw[0][0] = 0;

            for (let i = 1; i <= n; i++) {
                for (let j = 1; j <= m; j++) {
                    const cost = Math.abs(dataA[i - 1] - dataB[j - 1]);
                    dtw[i][j] = cost + Math.min(dtw[i - 1][j], dtw[i][j - 1], dtw[i - 1][j - 1]);
                }
            }

            return dtw[n][m];
        }

        function calculateSimilarityPercentageWithDTW(referenceData) {
            const dtwDistanceValue = dtwDistance(
                normalizedDataSet.map(d => d.y),
                referenceData.map(d => d.y)
            );
            return Math.max(0, 100 - dtwDistanceValue);
        }

        const normalizedData1 = normalizeData(data1);
        const normalizedData2 = normalizeData(data2);
        const normalizedData3 = normalizeData(data3);
        const normalizedDataSet = normalizeData(dataSet);

        const similarity1 = calculateSimilarityPercentageWithDTW(normalizedData1);
        const similarity2 = calculateSimilarityPercentageWithDTW(normalizedData2);
        const similarity3 = calculateSimilarityPercentageWithDTW(normalizedData3);

        return [similarity1, similarity2, similarity3];
    }

    return (
        <>
            <section className='w-10/12 flex flex-row text-pretty text-center gap-6 border-t-[1px] border-solid border-zinc-800'>
                <div className="flex flex-col justify-center items-center">
                    <img className='size-60' src="/graph1.jpeg" alt="Gráfica base de comparación 1" />
                    <p className='p-4'>Porcentaje de Semejanza con la gráfica:  <span className='font-extrabold'>{similarity1.toFixed(2)}%</span></p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img className='size-60' src="/graph2.jpeg" alt="Gráfica base de comparación 2" />
                    <p className='p-4'>Porcentaje de Semejanza con la gráfica:  <span className='font-extrabold'>{similarity2.toFixed(2)}%</span></p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <img className='size-60' src="/graph3.jpeg" alt="Gráfica base de comparación 3" />
                    <p className='p-4'>Porcentaje de Semejanza con la gráfica:  <span className='font-extrabold'>{similarity3.toFixed(2)}%</span></p>
                </div>
            </section>
        </>
    );
}

export default SimilarGraph;
