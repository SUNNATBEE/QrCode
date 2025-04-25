
import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, Scan } from "lucide-react";

const ScanScreen = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5Qrcode("qr-reader-box");

        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length > 0) {
                const cameraId = devices[0].id;
                scanner.start(
                    cameraId,
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    (decodedText) => {
                        setResult(decodedText);
                        scanner.stop().catch(() => {});
                    },
                    (error) => {
                        // ignore scan errors
                    }
                );
            }
        }).catch(err => {
            console.error("Kamera topilmadi:", err);
        });

        return () => {
            scanner.stop().catch(() => {});
        };
    }, []);

    return (
        <div className="bg-black rounded-3xl overflow-hidden text-center p-4">
            <div className="flex justify-end p-2">
                <button className="text-gray-400">
                    <Camera size={20} />
                </button>
            </div>

            <div className="p-4">
                <p className="text-xs text-gray-400 mb-2">Scan QR Code of the device</p>

                <div className="bg-gray-900 p-4 rounded-lg mb-6 relative">
                    <div id="qr-reader-box" className="w-full aspect-square flex items-center justify-center" />
                </div>

                {result && (
                    <div className="bg-gray-800 text-green-400 p-3 text-sm rounded break-all">
                        <strong>Natija:</strong> <br />
                        {result}
                    </div>
                )}

                <p className="text-xs text-gray-400 mt-4">
                    The QR code will be automatically scanned when placed within the camera frame
                </p>
            </div>

            <div className="flex justify-center gap-4 p-2">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
                    Scan QR
                </button>
                <button className="bg-transparent border border-gray-600 text-gray-400 px-4 py-2 rounded-md text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ScanScreen;
