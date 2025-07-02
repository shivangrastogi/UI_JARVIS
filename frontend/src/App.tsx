import {useState, useEffect} from 'react';
import CentralArcReactor from './components/CentralArcReactor';
import VoiceCommandButton from './components/VoiceCommandButton';
import ChatPanel from './components/ChatPanel';
import SystemDiagnostics from './components/SystemDiagnostics';
import HUDOverlay from './components/HUDOverlay';

function App() {
    const [isListening, setIsListening] = useState(false);
    const [showInterface, setShowInterface] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInterface(true);

            // Start Jarvis on backend
            fetch("http://localhost:5000/start-jarvis", {
                method: "POST"
            })
                .then((res) => res.json())
                .then((data) => console.log("[Frontend] Jarvis Triggered:", data))
                .catch((err) => console.error("[Frontend] Failed to trigger Jarvis", err));

        }, 500);

        return () => clearTimeout(timer);
    }, []);


    const handleToggleListening = () => {
        setIsListening(!isListening);
    };

    const handleArcReactorClick = () => {
        setIsListening(true);
        setTimeout(() => setIsListening(false), 4000);
    };

    return (
        <div className="fixed inset-0 bg-black text-white overflow-hidden">
            {/* Deep space tech background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/20">
                <div
                    className="absolute inset-0 bg-gradient-radial from-cyan-900/10 via-transparent to-transparent"></div>
                <div className="absolute inset-0 circuit-overlay opacity-30"></div>
            </div>

            {/* HUD Overlay Elements */}
            <HUDOverlay/>

            {/* Main Interface Container */}
            <div className={`relative z-10 h-full flex flex-col transition-all duration-2000 ${
                showInterface ? 'opacity-100' : 'opacity-0'
            }`}>

                {/* Header - Fixed Top */}
                <header
                    className="fixed top-0 left-0 right-0 z-20 text-center pt-8 pb-4 bg-gradient-to-b from-black/80 to-transparent">
                    <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent font-audiowide tracking-wider text-glow">
                        J.A.R.V.I.S
                    </h1>
                    <p className="text-xl text-cyan-300 font-exo mb-1 tracking-wide">Just A Rather Very Intelligent
                        System</p>
                    <p className="text-gray-400 font-exo text-sm">STARK INDUSTRIES • MARK 52 INTERFACE</p>

                    {/* Status indicators */}
                    <div className="flex justify-center items-center space-x-6 mt-3">
                        <div className="flex items-center space-x-2 text-xs text-cyan-400">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                            <span className="font-audiowide">ONLINE</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-green-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-audiowide">SECURE</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-blue-400">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="font-audiowide">READY</span>
                        </div>
                    </div>
                </header>

                {/* Central Arc Reactor - Fixed Center */}
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-15">
                    <CentralArcReactor isActive={isListening} onClick={handleArcReactorClick}/>
                </div>

                {/* Voice Command Button - Fixed Bottom Left */}
                <div className="fixed bottom-32 left-8 z-20">
                    <VoiceCommandButton isListening={isListening} onToggleListen={handleToggleListening}/>
                </div>

                {/* Chat Panel - Fixed Bottom Right */}
                <div className="fixed bottom-32 right-8 z-20">
                    <ChatPanel isListening={isListening}/>
                </div>
            </div>

            {/* System Diagnostics - Fixed Bottom */}
            <SystemDiagnostics/>
        </div>
    );
}

export default App;