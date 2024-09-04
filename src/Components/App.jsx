import { useState } from 'react';
import Papa from 'papaparse';
import FileUploader from './FileUploader.jsx';
import ChartDisplay from './ChartDisplay.jsx';

function App() {
    const [data, setData] = useState([]);
    const [interval, setInterval] = useState(5);
    const handleFileUpload = (file) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                const parsedData = results.data.map(row => ({
                    date: new Date(row['Fecha']),
                    value: row['Valor']
                }));
                parsedData.pop()
                setData(parsedData);
            }
        });
        console.log(file)
    };

    const handleIntervalChange = (e) => setInterval(Number(e.target.value));

    return (
        <>
            <header className='flex justify-between w-[80dvw] mt-12 pb-6 border-b-[1px] border-solid border-zinc-800'>
                <h1 className="font-bold text-xl">CSV-Analyze</h1>

                <nav className="flex flex-row gap-12 mx-3">
                    <a className="hover:underline" href="index.html">Inicio</a>
                </nav>
            </header>
            <main className="flex flex-col justify-center items-center w-10/12 h-full">
                <FileUploader onFileUpload={handleFileUpload} />
                <div className='m-4 '>
                    <label>Intervalo de datos: </label>
                    <select className='border-2 border-solid border-zinc-600' value={interval} onChange={handleIntervalChange}>
                        <option value={5}>5 minutos</option>
                        <option value={10}>10 minutos</option>
                        <option value={15}>15 minutos</option>
                        <option value={30}>30 minutos</option>
                    </select>
                </div>
                {data.length > 0 && (
                    <ChartDisplay data={data} interval={interval} />
                )}
            </main>
            <footer className='h-[30vh] w-full mt-4 bg-gray-300 flex flex-col justify-end items-center'>
                <p className='text-lg font-bold m-8'>Dev By Vazquez Juarez Brandon</p>
            </footer>

        </>
    );
}

export default App;
