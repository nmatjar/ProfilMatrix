import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Terminal, Coffee, Lightbulb, Zap, FileCode, Fingerprint, Twitter } from "lucide-react";
import React from "react";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-green-500 border border-green-700 max-w-[95vw] md:max-w-3xl mx-auto overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-terminal flex items-center gap-2 flex-wrap">
            <Terminal className="h-6 w-6 text-green-400" />
            <span className="font-mono">ProfilMatrix_v1.0</span>
            <div className="ml-2 px-2 py-1 bg-green-900 bg-opacity-30 rounded text-sm font-mono">ALPHA</div>
          </DialogTitle>
          <DialogDescription className="text-green-400 font-mono mt-2 border-b border-green-900 pb-2">
            &gt; Retro-modern profile visualization and code generation system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 text-green-400 font-mono py-3 md:py-4">
          <div className="flex items-start gap-2 md:gap-4 bg-green-950 bg-opacity-20 p-2 md:p-4 rounded text-sm md:text-base">
            <Lightbulb className="h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold">Co to jest?</h3>
              <p className="opacity-90 mt-1 text-xs md:text-sm">
                ProfilMatrix to narzędzie do wizualnego tworzenia i zarządzania profilami osobowości, umiejętności i preferencji
                zawodowych poprzez system kodowania DNA. Łączy ono łatwość użycia graficznego interfejsu z precyzją kodowania
                tekstowego, pozwalając na tworzenie złożonych profili w standardowym formacie.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 md:gap-4 bg-green-950 bg-opacity-20 p-2 md:p-4 rounded text-sm md:text-base">
            <Zap className="h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold">Jak używać?</h3>
              <p className="opacity-90 mt-1 text-xs md:text-sm">
                1. Wybierz kategorie z menu po lewej stronie<br />
                2. Zaznacz opcje które najlepiej Cię opisują<br />
                3. Skopiuj wygenerowany kod DNA<br />
                4. Udostępnij kod lub wklej go w zakładce dekodowania aby go odczytać
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 md:gap-4 bg-green-950 bg-opacity-20 p-2 md:p-4 rounded text-sm md:text-base">
            <FileCode className="h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold">Format kodu DNA</h3>
              <p className="opacity-90 mt-1 text-xs md:text-sm">
                Kod DNA używa emoji do oznaczania kategorii oraz specjalnego formatu do kodowania wartości.
                Struktura: <span className="bg-black px-1 py-0.5 md:px-2 md:py-1 rounded text-xs md:text-sm inline-block max-w-full overflow-x-auto">[Emoji]{'{'}[Segment]=[Val];...{'}'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 md:gap-4 bg-green-950 bg-opacity-20 p-2 md:p-4 rounded text-sm md:text-base">
            <Fingerprint className="h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold">Prywatność</h3>
              <p className="opacity-90 mt-1 text-xs md:text-sm">
                Wszystkie dane są przechowywane lokalnie w Twojej przeglądarce. Nie wysyłamy żadnych informacji na serwery.
                Kod DNA możesz bezpiecznie udostępniać - zawiera on tylko informacje, które świadomie wybrałeś.
              </p>
            </div>
          </div>
        </div>

        <div className="text-green-400 font-mono text-center text-[10px] md:text-xs pt-2 border-t border-green-900">
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="flex items-center justify-center gap-1">
              <Coffee className="h-4 w-4" />
              <span>Powered by caffeine and nostalgia</span>
            </div>
            <div className="flex gap-2">
              <a 
                href="https://buycoffee.to/mat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-green-900 bg-opacity-30 rounded hover:bg-opacity-50 transition-all text-[10px] md:text-xs"
              >
                <Coffee className="h-4 w-4" />
                <span>Wesprzyj rozwój projektu</span>
              </a>
              <a 
                href="https://x.com/MattJarosPL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-green-900 bg-opacity-30 rounded hover:bg-opacity-50 transition-all text-[10px] md:text-xs"
              >
                <Twitter className="h-4 w-4" />
                <span>@MattJarosPL</span>
              </a>
            </div>
          </div>
          <div>© 2025 ProfilMatrix</div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="border-green-700 hover:bg-green-900 hover:bg-opacity-30">
              &gt; EXIT
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
