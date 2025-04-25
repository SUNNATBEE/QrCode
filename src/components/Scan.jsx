
import { useState, useRef, useEffect } from 'react';
import { Camera, QrCode, Upload, Download, X } from 'lucide-react';

const QRCodeUploader = ({ onQRCodeStateChange }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (onQRCodeStateChange) {
            onQRCodeStateChange(!!uploadResult);
        }
    }, [uploadResult, onQRCodeStateChange]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
        }
    };

    const clearFile = () => {
        setFile(null);
        setFileName('');
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const uploadFile = async () => {
        if (!file) {
            setError("Iltimos, fayl tanlang");
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://qr.abdugafforov.uz/upload/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Yuklash muvaffaqiyatsiz: ${response.status}`);
            }

            const result = await response.json();
            setUploadResult(result); 
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || "Yuklashda xatolik yuz berdi");
        } finally {
            setIsUploading(false);
        }
    };

    const downloadQRCode = () => {
        if (!uploadResult?.qr_code_url) return;
        const qrUrl = `https://qr.abdugafforov.uz${uploadResult.qr_code_url}`;
        window.open(qrUrl, '_blank');
    };

    const handleAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (!uploadResult) {
        return (
            <div className="text-center">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Rasm yuklash</h2>
                    <Camera size={20} className="text-gray-400" />
                </div>

                <div
                    className="border-2 border-dashed border-gray-600 rounded-lg p-3 mb-4 relative cursor-pointer"
                    onClick={handleAreaClick}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <div className="flex flex-col items-center justify-center py-4">
                        <Upload size={24} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-300 mb-1">
                            {fileName ? fileName : "Rasmni yuklash uchun bosing"}
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG formatlar</p>
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={uploadFile}
                        disabled={isUploading || !file}
                        className={`flex-1 py-2 rounded-md text-sm transition-colors ${isUploading || !file
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {isUploading ? "Yuklanmoqda..." : "Yuklash"}
                    </button>

                    <button
                        onClick={clearFile}
                        className="flex-1 border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300 py-2 rounded-md text-sm transition-colors"
                    >
                        Bekor qilish
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Rasm yuklash</h2>
                <Camera size={20} className="text-gray-400" />
            </div>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between relative">
                    <div className="flex-1 text-left ml-2">
                        <p className="text-sm text-gray-300 truncate" style={{ maxWidth: '150px' }}>
                            {fileName}
                        </p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            clearFile();
                        }}
                        className="text-gray-400 hover:text-white p-1"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
                <h3 className="text-md font-medium mb-4">QR Kod</h3>

                <div className="bg-white p-4 rounded-lg mb-6">
                    <div className="w-full aspect-square bg-white flex items-center justify-center">
                        {uploadResult?.qr_code_url ? (
                            <img 
                                src={`https://qr.abdugafforov.uz${uploadResult.qr_code_url}?t=${Date.now()}`} 
                                alt="QR Code" 
                                className="max-w-full h-auto"
                            />
                        ) : (
                            <QrCode size={150} className="text-black" />
                        )}
                    </div>
                </div>

                <button
                    onClick={downloadQRCode}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm transition-colors"
                >
                    <Download size={16} />
                    QR Kodni yuklab olish
                </button>

                <button
                    onClick={() => {
                        setUploadResult(null);
                        clearFile();
                    }}
                    className="w-full mt-3 border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300 py-2 rounded-md text-sm transition-colors"
                >
                    Yangi rasm yuklash
                </button>
            </div>
        </div>
    );
};

export default QRCodeUploader;
