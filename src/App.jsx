import { useState } from 'react';
import { Camera, QrCode, Scan } from 'lucide-react';
import ScanScreen from './components/Generate';
import RegisterScreen from './components/Register';
import QRCodeUploader from './components/Scan';

const App = () => {
  const [activeTab, setActiveTab] = useState('qrcode');

  const renderContent = () => {
    switch (activeTab) {
      case 'qrcode':
        return <QRCodeUploader/>;
      case 'scan':
        return <ScanScreen />;
      case 'register':
        return <RegisterScreen />;
      default:
        return <QRCodeScreen />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-800 text-white">
      <div className="container flex items-center justify-center gap-10 mx-auto px-4 py-6 flex-1 max-[680px]:flex-col">

        <div>      <h1 className="text-4xl font-bold mb-8 ml-2">Your Domain</h1>

          {/* Button container - horizontal layout */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              className={`px-4 py-2 rounded-md font-medium ${activeTab === 'qrcode' ? 'bg-blue-500' : 'bg-white text-black'}`}
              onClick={() => setActiveTab('qrcode')}
            >
              Rasm yuklash
            </button>

            <button
              className={`px-4 py-2 rounded-md font-medium ${activeTab === 'scan' ? 'bg-blue-500' : 'bg-white text-black'}`}
              onClick={() => setActiveTab('scan')}
            >
              QrCodeni scanner qilish
            </button>

            <button
              className={`px-4 py-2 rounded-md font-medium ${activeTab === 'register' ? 'bg-blue-500' : 'bg-white text-black'}`}
              onClick={() => setActiveTab('register')}
            >
              Registratsiya
            </button>
          </div></div>


        {/* Phone mockup - centered */}
        <div className="flex justify-center items-center">
          <div className="relative max-w-xs w-full">
            <div className="bg-black rounded-3xl overflow-hidden p-4 pb-6 mx-auto" style={{ maxWidth: '350px' }}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default App