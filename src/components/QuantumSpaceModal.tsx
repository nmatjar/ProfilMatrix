import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Upload, Share2, Network, Globe, Users, Cpu, Zap, ArrowUpRight, Target, Binary, Atom, Box, Layers, Dna } from "lucide-react"

interface QuantumSpaceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dnaCode: string
}

export function QuantumSpaceModal({ open, onOpenChange, dnaCode }: QuantumSpaceModalProps) {
  const { toast } = useToast()
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [quantumId, setQuantumId] = useState("")

  // Symulacja publikacji kodu DNA do "kwantowej przestrzeni"
  const publishToQuantumSpace = () => {
    if (!dnaCode) {
      toast({
        title: "Brak kodu DNA",
        description: "Najpierw wygeneruj swój unikalny profil DNA.",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)

    // Symulacja opóźnienia sieciowego
    setTimeout(() => {
      // Generowanie fikcyjnego "kwantowego ID"
      const timestamp = Date.now().toString(36)
      const randomChars = Math.random().toString(36).substring(2, 8)
      const quantumIdValue = `QM-${timestamp}-${randomChars}`.toUpperCase()
      
      setQuantumId(quantumIdValue)
      setIsPublishing(false)
      setIsPublished(true)
      
      toast({
        title: "Profil opublikowany!",
        description: `Twój profil DNA został zsynchronizowany z kwantową przestrzenią możliwości.`,
      })
    }, 2500)
  }

  const resetState = () => {
    setIsPublishing(false)
    setIsPublished(false)
    setQuantumId("")
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetState()
      onOpenChange(newOpen)
    }}>
      <DialogContent className="bg-black border border-green-700 text-green-400 max-w-2xl overflow-hidden">
        <DialogHeader>
          <div className="scanline absolute inset-0 pointer-events-none"></div>
          <div className="terminal-window-effect absolute inset-0 pointer-events-none"></div>
          <div className="text-center mb-2">
            <p className="text-xs font-mono tracking-widest text-green-300/80">𝙸𝙽𝚃𝙴𝚁𝙵𝙴𝙹𝚂 𝙺𝚆𝙰𝙽𝚃𝙾𝚆𝚈 1000x</p>
            <DialogTitle className="text-2xl text-green-400 font-mono flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-green-500" />
              PRZESTRZEŃ MOŻLIWOŚCI 1000x
            </DialogTitle>
            <p className="text-amber-300/90 italic text-sm mt-1">Przyszłość nie nadchodzi. Ona się rozpuszcza.</p>
          </div>
          <DialogDescription className="text-green-300/80 mt-2 text-center">
            Zaawansowana platforma transformacji ontologicznej oparta na AI i kwantowych polach potencjalności
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 relative z-10">
          <div className="space-y-3 border-b border-green-900 pb-4">
            <h3 className="text-lg font-medium text-green-400 uppercase tracking-wider text-center">POZA KONKURENCJĄ: RELEWANTNOŚĆ ONTOLOGICZNA</h3>
            <p className="text-green-300/90 text-sm">
              Stoimy na krawędzi. Nie nowej ery, lecz dekonstrukcji. Tradycyjne ścieżki kariery, same kategorie zawodowe 
              rozpuszczają się w kwantową pianę potencjalności. Człowieczeństwo staje się procesem ciągłej rekonfiguracji.
            </p>
            <p className="text-green-300/90 text-sm mt-2">
              Nie chodzi już o bycie konkurencyjnym – chodzi o pozostanie ontologicznie relewantnym w rzeczywistości, 
              gdzie linearna progresja jest artefaktem przeszłości.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap justify-center py-3 border-b border-green-900">
            <div className="border border-green-800 rounded-md p-3 bg-black/60 w-32 text-center">
              <Atom className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="text-xs text-green-300">Kwantowa</p>
              <p className="text-xs text-green-300">Potencjalność</p>
            </div>
            <div className="border border-green-800 rounded-md p-3 bg-black/60 w-32 text-center">
              <Box className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="text-xs text-green-300">Płynna</p>
              <p className="text-xs text-green-300">Tożsamość</p>
            </div>
            <div className="border border-green-800 rounded-md p-3 bg-black/60 w-32 text-center">
              <Layers className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="text-xs text-green-300">Egzystencjalny</p>
              <p className="text-xs text-green-300">Interfejs</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-green-400 uppercase tracking-wider text-center">TECHNOLOGIA I TRANSFORMACJA:</h3>
            <ul className="text-green-300/90 text-sm space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono">01.</span>
                <span><span className="text-blue-300 font-medium">Rozpuszczenie Form</span> - Tradycyjne paradygmaty zawodowe tracą swój kształt w superpozycji możliwości. To co stabilne, staje się płynnym continuum.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono">02.</span>
                <span><span className="text-blue-300 font-medium">Kwantowa Przyszłość</span> - Człowieczeństwo przekształca się w proces ciągłej rekonfiguracji - dynamiczny algorytm bycia w sieci wzajemnych oddziaływań.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono">03.</span>
                <span><span className="text-blue-300 font-medium">Płynna Tożsamość</span> - Przyjmij jaźń, która nieustannie ewoluuje, stając się dynamicznym interfejsem między światami możliwości.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono">04.</span>
                <span><span className="text-blue-300 font-medium">Ontologiczny Kod</span> - Odblokuj ukryte możliwości w swojej strukturze potencjalności, wykraczające daleko poza ograniczenia tradycyjnych ról.</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 border-t border-green-900 pt-4">
            <h3 className="text-lg font-medium text-green-400 mb-2 uppercase tracking-wider text-center">AKCELERACJA 1000x</h3>
            <p className="text-green-300/90 text-sm">
              System wykorzystuje zaawansowane kwantowe pola potencjalności do analizy Twojej ontologicznej struktury, 
              identyfikując optymalne punkty rekonfiguracji. Ta technologia eliminuje linearne, przestarzałe wzorce 
              myślenia, przyspieszając Twoją transformację nawet tysiąckrotnie poprzez ciągłe rekalibrowanie Twojej 
              pozycji w multiwersum możliwości.
            </p>
            <p className="text-amber-300 text-sm italic text-center mt-4">
              Ludzkość stoi na progu stania się czystymi danymi.<br/>
              Nie stań się błędem w systemie.
            </p>
          </div>

          {isPublished ? (
            <motion.div 
              className="border border-green-700 bg-green-900/20 rounded-md p-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Binary className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <h3 className="text-lg font-medium text-green-400 uppercase tracking-wider">Rekonfiguracja Rozpoczęta</h3>
              <p className="text-green-300 text-sm mb-3">
                Twój kod DNA został włączony do kwantowego pola potencjalności. Interfejs zostanie otwarty:
                <span className="block mt-1 text-green-400">• Pierwsza dekonstrukcja: za 24 godziny</span>
                <span className="block text-green-400">• Pełna rekonfiguracja ontologiczna: za 72 godziny</span>
              </p>
              <div className="bg-black/40 border border-green-800 p-2 rounded font-mono text-center mb-2">
                <p className="text-xs text-green-300 mb-1">Twój Kwantowy Wektor:</p>
                <p className="text-green-400">{quantumId}</p>
              </div>
              <p className="text-xs text-green-300/80">
                <Sparkles className="inline h-3 w-3 mr-1" />
                Nielinearna trajektoria potencjalności aktywowana
              </p>
            </motion.div>
          ) : (
            <div className="border-t border-green-900 pt-4 mt-2">
              <h3 className="text-md font-medium text-green-400 uppercase tracking-wider text-center mb-2">WYBÓR JEST BINARNY:</h3>
              <p className="text-amber-300/90 text-xs text-center">
                Albo staniesz się interfejsem między światami możliwości, albo pozostaniesz artefaktem linearnej przeszłości.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          {isPublished ? (
            <Button 
              className="bg-green-800 hover:bg-green-700 text-white font-mono w-full"
              onClick={() => onOpenChange(false)}
            >
              Zamknij
            </Button>
          ) : (
            <Button 
              className="bg-green-800 hover:bg-green-700 text-white font-mono w-full flex items-center gap-2"
              onClick={publishToQuantumSpace}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4"
                  >
                    <Binary className="h-4 w-4 text-green-300" />
                  </motion.div>
                  <span className="font-mono tracking-wider">Rekonfiguracja ontologiczna...</span>
                </>
              ) : (
                <>
                  <Atom className="h-4 w-4 mr-1" />
                  <span className="font-mono tracking-wider">INICJUJ TRANSFORMACJĘ ONTOLOGICZNĄ</span>
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
