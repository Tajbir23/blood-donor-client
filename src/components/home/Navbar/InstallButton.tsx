import React from 'react'
import { FaDownload } from 'react-icons/fa'

const InstallButton = () => {
    // Define the type for the beforeinstallprompt event
    let deferredPrompt: any;

    React.useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the default mini-infobar
            e.preventDefault();
            
            // Store the event for later use
            deferredPrompt = e;
            
            // Show the install button
            const installBtn = document.getElementById('installBtn');
            if (installBtn) {
                installBtn.hidden = false;
                
                // Add click event listener inside the effect
                installBtn.addEventListener('click', async () => {
                    installBtn.hidden = true;
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    console.log(`User response: ${outcome}`);
                    deferredPrompt = null;
                });
            }
        };
        
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    return (
        <button id='installBtn' hidden className="flex items-center px-3 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors duration-200 ml-2">
            <FaDownload className="mr-1" />
            অ্যাপ ইনস্টল
        </button>
    )
}

export default InstallButton