import { Camera, Scan } from "lucide-react";

const ScanScreen = () => {
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
                    <div className="w-full aspect-square flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-blue-400 rounded-lg opacity-50"></div>
                        <Scan size={40} className="text-blue-400" />
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-8">The QR code can be automatically scanned when placed within the camera frame</p>
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

export default ScanScreen