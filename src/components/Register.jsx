import { Camera, QrCode } from "lucide-react";

const RegisterScreen = () => {
    return (
        <div className="bg-black rounded-3xl overflow-hidden text-center p-4">
            <div className="flex justify-end p-2">
                <button className="text-gray-400">
                    <Camera size={20} />
                </button>
            </div>

            <div className="p-4">
                <p className="text-xs text-gray-400 mb-2">Register new device</p>

                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                    <div className="w-full aspect-square flex flex-col items-center justify-center gap-4">
                        <QrCode size={60} className="text-gray-600" />
                        <p className="text-gray-400 text-sm">Scan QR code to register device</p>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-8">Position the QR code within the frame to register a new device</p>
            </div>

            <div className="flex justify-center gap-4 p-2">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
                    Register
                </button>
                <button className="bg-transparent border border-gray-600 text-gray-400 px-4 py-2 rounded-md text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RegisterScreen
