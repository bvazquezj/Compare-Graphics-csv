import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import SimilarGraph from './SimilarGraph'

ChartDisplay.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.instanceOf(Date).isRequired,
        value: PropTypes.number.isRequired,
    })).isRequired,
    interval: PropTypes.number.isRequired,
    tolerance: PropTypes.number,
};


function ChartDisplay({ data, interval}) {
    let result = {}
    if (!data.length || !data[0] || typeof data[0].value === 'undefined') {
        return <div>No hay datos válidos disponibles para mostrar.</div>;
    }
    const groupDataByInterval = () => {
        const groupedData = [];
        let firstTime = data[0].date.getTime();
        let miliInterval = interval * 60 * 1000;
        let expectedTime = firstTime + miliInterval;

        data.forEach((d) => {
            if (!d || typeof d.date === 'undefined') return; 
            let currentTime = d.date.getTime();

            
            if (currentTime === expectedTime) {
                groupedData.push(d);
                expectedTime += miliInterval;
            }
        });
        console.log(groupedData)
        return groupedData;
    };

    const processDataForChart = () => {
        const groupedData = groupDataByInterval();
        console.log({
            labels: groupedData.map(d => d.date),
            datasets: [{
                label: 'Valores',
                data: groupedData.map(d => d.value),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                pointBackgroundColor: (context) => {
                    const index = context.dataIndex;
                    return index === 0 ? 'yellow' : index === groupedData.length - 1 ? 'green' : 'blue';
                }
            }]
        })
        const formattedData = groupedData.map(d => ({
            ...d,
            date: format(new Date(d.date), 'MM/dd/yy HH:mm:ss')
        }));

        result = groupedData.reduce((acc, curr, index) => {
            
            if (curr.value > acc.max.value) {
                acc.max = curr;
            }
            if (curr.value < acc.min.value) {
                acc.min = curr;
            }

            
            if (index === 0) {
                acc.start = curr;
            }
            if (index === groupedData.length - 1) {
                acc.end = curr;
            }

            return acc;
        }, { max: groupedData[0], min: groupedData[0], start: null, end: null });

        console.log('Objeto con el valor máximo:', result.max);
        console.log('Objeto con el valor mínimo:', result.min);
        console.log('Punto inicial:', result.start);
        console.log('Punto final:', result.end);

        return {
            labels: formattedData.map(d => d.date),
            datasets: [{
                label: 'Valores',
                data: groupedData.map(d => d.value),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                pointBackgroundColor: (context) => {
                    const index = context.dataIndex;
                    return index === 0 ? 'yellow' : index === groupedData.length - 1 ? 'green' : 'blue';
                }
            }]
        };
    };

    return (
        <>
            <div className="w-10/12 h-[90dvh] my-4 flex items-center border-t-[1px] border-solid border-zinc-800">
                <Line
                    margin={{
                        top: 32, right: 30, left: 0, bottom: 120,
                    }}
                    data={processDataForChart()}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                            title: {
                                display: true,
                                text: "Datos del CSV",
                            },
                        }
                    }}
                />
            </div>
            <SimilarGraph data={groupDataByInterval()} />
        </>
    );
}

export default ChartDisplay;
