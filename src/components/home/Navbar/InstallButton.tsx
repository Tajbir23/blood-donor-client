import { useState, useEffect, useRef } from "react";
import { BsDownload } from "react-icons/bs";

// Define a type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton = () => {
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false);
  // Replace let deferredPrompt with useRef
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event so it can be triggered later
      deferredPromptRef.current = e as BeforeInstallPromptEvent;
      // Show the install button
      setShowInstallButton(true);
    };

    // Add the event listener
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    // Cleanup
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // If there's no deferred prompt, do nothing
    if (!deferredPromptRef.current) return;

    // Show the install prompt
    deferredPromptRef.current.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPromptRef.current.userChoice;
    
    // User accepted the installation
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setShowInstallButton(false);
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the saved prompt as it can't be used again
    deferredPromptRef.current = null;
  };

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-md text-sm"
    >
      <BsDownload /> Install
    </button>
  );
};

export default InstallButton;