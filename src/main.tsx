import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Hackerskie pozdrowienie dla developerów
(() => {
  const style = 
    'color: lime; background: black; font-size: 16px; padding: 8px; border: 1px solid lime; border-radius: 4px;';
  const ACII_ART = `
    ██████╗ ██████╗  ██████╗ ███████╗██╗██╗     ███████╗     ██████╗ ██████╗ ██████╗ ███████╗██████╗ 
    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██║██║     ██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗
    ██████╔╝██████╔╝██║   ██║█████╗  ██║██║     █████╗      ██║     ██║   ██║██║  ██║█████╗  ██████╔╝
    ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██║██║     ██╔══╝      ██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗
    ██║     ██║  ██║╚██████╔╝██║     ██║███████╗███████╗    ╚██████╗╚██████╔╝██████╔╝███████╗██║  ██║
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                                                                                  v1.0
    `;
  
  setTimeout(() => {
    console.log('%c' + ACII_ART, style);
    console.log('%c👨‍💻 Pozdrowienia dla developerów! 👨‍💻', style);
    console.log('%cZnalazłeś easter egga! Skontaktuj się z autorem: https://www.linkedin.com/in/matjarosiewicz/', style);
    console.log('%c>>> Retro-Modern DNA Profiler | Power to the developers! <<<', style);
  }, 1000);
})();

createRoot(document.getElementById("root")!).render(<App />);
