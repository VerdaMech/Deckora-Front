import React from 'react';

function InputFile({ onChange, accept = "image/*", className = "", disabled = false, preview = null,}) {
    return (
        <div className={`space-y-3 ${className}`}>
            <div className="relative">
                <input type="file" accept={accept} onChange={onChange} disabled={disabled} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                <div className={`flex items-center justify-center px-4 py-3
                                border-2 border-dashed rounded-lg text-sm font-medium
                                transition-all duration-200
                    ${disabled ? 'border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed' : 'border-blue-400 bg-blue-50 text-blue-700 hover:border-blue-500 hover:bg-blue-100'} `}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    {disabled ? "Subiendo..." : "Seleccionar imagen"}
                </div>
            </div>
            {preview && (
                <div className="flex justify-center">
                    <img src={preview} alt="Previsualización" className="h-32 w-32 object-cover rounded-lg shadow-md border border-gray-200" />
                </div>
            )}
        </div>
    );
}

export default InputFile;