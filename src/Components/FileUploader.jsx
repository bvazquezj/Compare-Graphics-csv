import PropTypes from 'prop-types';

FileUploader.propTypes = {
    onFileUpload: PropTypes.func.isRequired,
};

function FileUploader({ onFileUpload }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const handleDropFile = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if(file){
            onFileUpload(file)
        }
    }
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className='w-5/6 my-8 h-[60dvh]'>
            <label htmlFor='dropzone-file' onDrop={handleDropFile} onDragOver={handleDragOver} className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-700  "><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                    <p className="text-xs text-gray-700 ">Sube tu .CSV</p>
                </div>
                <input id="dropzone-file" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
            </label>
        </div>
    );
}

export default FileUploader;
