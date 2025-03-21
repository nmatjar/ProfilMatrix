import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { parseDNACode, ParsedDNASegment } from "@/lib/dna-code-mapping"
import { segments as allSegments } from "@/lib/segment-data"
import { Link } from 'react-router-dom'
import { DNACodeDisplay } from "@/components/DNACodeDisplay"
import { Brain, Code, Copy, CopyCheck, FileText, Home, RefreshCw, Terminal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DNADecoderPage() {
  const { toast } = useToast()
  const [dnaCode, setDnaCode] = useState<string>("")
  const [parsedDna, setParsedDna] = useState<ParsedDNASegment[]>([])
  const [descriptiveText, setDescriptiveText] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("decoded")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (dnaCode) {
      try {
        const parsed = parseDNACode(dnaCode)
        setParsedDna(parsed)
        generateDescriptiveText(parsed)
      } catch (error) {
        console.error("Error parsing DNA code:", error)
        toast({
          title: "Błąd parsowania",
          description: "Kod DNA ma nieprawidłowy format. Sprawdź wprowadzony kod.",
          variant: "destructive"
        })
      }
    } else {
      setParsedDna([])
      setDescriptiveText("")
    }
  }, [dnaCode, toast])

  const generateDescriptiveText = (parsedDna: ParsedDNASegment[]) => {
    if (!parsedDna.length) {
      setDescriptiveText("")
      return
    }

    let text = "Profil zawodowy:\n\n"

    parsedDna.forEach(segment => {
      text += `## ${segment.areaName}\n`
      
      segment.codes.forEach(code => {
        // Znajdź pełne informacje o segmencie
        const segmentInfo = allSegments.find(s => s.code === code.code)
        if (segmentInfo) {
          text += `- ${segmentInfo.name}: ${code.decodedValue}\n`
          if (segmentInfo.description) {
            text += `  ${segmentInfo.description}\n`
          }
        }
      })
      
      text += "\n"
    })

    text += "\nWygenerowano przez ProfileCoder"
    setDescriptiveText(text)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast({
      title: "Skopiowano!",
      description: `${type} został skopiowany do schowka.`,
      variant: "default"
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDecode = () => {
    if (!dnaCode) {
      toast({
        title: "Brak kodu DNA",
        description: "Wprowadź kod DNA do zdekodowania.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const parsed = parseDNACode(dnaCode)
      setParsedDna(parsed)
      generateDescriptiveText(parsed)
      setActiveTab("decoded")
      toast({
        title: "Zdekodowano",
        description: "Kod DNA został pomyślnie zdekodowany.",
        variant: "default"
      })
    } catch (error) {
      console.error("Error parsing DNA code:", error)
      toast({
        title: "Błąd parsowania",
        description: "Kod DNA ma nieprawidłowy format. Sprawdź wprowadzony kod.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setDnaCode("")
    setParsedDna([])
    setDescriptiveText("")
  }

  const renderParsedSegments = () => {
    if (!parsedDna.length) {
      return (
        <div className="text-center p-8 text-gray-400 border border-green-900 border-dashed rounded-md bg-black bg-opacity-30">
          <div className="mb-4">Wprowadź kod DNA by zobaczyć zdekodowaną zawartość.</div>
          <Code className="h-12 w-12 mx-auto opacity-30" />
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {parsedDna.map((segment, index) => (
          <Card key={index} className="border border-green-700 rounded-md bg-black bg-opacity-90">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl font-bold text-white">
                <span className="mr-2 text-2xl">{segment.emoji}</span>
                {segment.areaName}
              </CardTitle>
              <CardDescription className="text-gray-300">Obszar: {segment.area}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segment.codes.map((code, codeIndex) => {
                  const segmentInfo = allSegments.find(s => s.code === code.code)
                  return (
                    <div key={codeIndex} className="border border-green-900 rounded-md p-4 bg-black bg-opacity-70 hover:border-green-600 transition-colors">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">{code.segmentEmoji}</span>
                        <span className="font-medium text-green-400">{segmentInfo?.name || code.code}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 ml-8">
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2 w-40">Kod:</span>
                          <code className="bg-green-900 bg-opacity-20 px-2 py-1 rounded font-mono text-white">{code.code}</code>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2 w-40">Wartość:</span>
                          <code className="bg-green-900 bg-opacity-20 px-2 py-1 rounded font-mono text-white">{code.value}</code>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2 w-40">Zdekodowana wartość:</span>
                          <span className="text-white">{code.decodedValue}</span>
                        </div>
                        {code.description && (
                          <div className="flex">
                            <span className="text-gray-400 mr-2 w-40">Opis:</span>
                            <span className="text-gray-300">{code.description}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black text-green-500 flex flex-col">
        <header className="border-b border-green-900 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Terminal className="h-7 w-7 mr-2" />
              <h1 className="text-2xl font-bold">ProfileCoder_v1.0</h1>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm" className="border-green-700 hover:bg-green-900 hover:bg-opacity-30 flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Powrót do strony głównej
              </Button>
            </Link>
          </div>
        </header>
        
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Dekoder Profilu DNA
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="border border-green-700 rounded-md bg-black bg-opacity-90">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold">Wprowadź kod DNA</CardTitle>
                    <CardDescription className="text-gray-300">
                      Wklej kod DNA, aby go zdekodować i uzyskać czytelny profil.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Wklej kod DNA tutaj..."
                      value={dnaCode}
                      onChange={(e) => setDnaCode(e.target.value)}
                      className="h-64 border-green-700 bg-black resize-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={handleReset} 
                          className="flex items-center border-red-700 hover:bg-red-900 hover:bg-opacity-30 text-red-500"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Resetuj
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Wyczyść wprowadzony kod DNA</p>
                      </TooltipContent>
                    </Tooltip>
                    <Button 
                      onClick={handleDecode} 
                      className="flex items-center bg-green-700 hover:bg-green-600"
                      disabled={isLoading}
                    >
                      {isLoading ? <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> : <Brain className="h-4 w-4 mr-1" />}
                      Dekoduj
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Tabs defaultValue="decoded" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-4 bg-black border border-green-900">
                    <TabsTrigger value="decoded" className="data-[state=active]:bg-green-900 data-[state=active]:bg-opacity-30 data-[state=active]:text-green-400">
                      Zdekodowany profil
                    </TabsTrigger>
                    <TabsTrigger value="formatted" className="data-[state=active]:bg-green-900 data-[state=active]:bg-opacity-30 data-[state=active]:text-green-400">
                      Sformatowany kod
                    </TabsTrigger>
                    <TabsTrigger value="text" className="data-[state=active]:bg-green-900 data-[state=active]:bg-opacity-30 data-[state=active]:text-green-400">
                      Opis do LLM
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="decoded" className="mt-0">
                    <Card className="border border-green-700 rounded-md bg-black bg-opacity-90">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold">Zdekodowany profil</CardTitle>
                        <CardDescription className="text-gray-300">
                          Profil z rozszyfrowaniem wszystkich segmentów i wartości.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96 rounded-md pr-4">
                          {renderParsedSegments()}
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="formatted" className="mt-0">
                    <Card className="border border-green-700 rounded-md bg-black bg-opacity-90">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold">Sformatowany kod DNA</CardTitle>
                        <CardDescription className="text-gray-300">
                          Podświetlona i sformatowana wersja kodu DNA.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96 rounded-md pr-4">
                          {dnaCode ? (
                            <div className="text-white">
                              <DNACodeDisplay rawCode={dnaCode} />
                            </div>
                          ) : (
                            <div className="text-center p-8 text-gray-400 border border-green-900 border-dashed rounded-md bg-black bg-opacity-30">
                              <div className="mb-4">Wprowadź kod DNA by zobaczyć sformatowany kod.</div>
                              <Code className="h-12 w-12 mx-auto opacity-30" />
                            </div>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        {dnaCode && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                onClick={() => copyToClipboard(dnaCode, "Kod DNA")}
                                variant="outline"
                                className="ml-auto flex items-center border-green-700 hover:bg-green-900 hover:bg-opacity-30"
                              >
                                {copied ? <CopyCheck className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                                Kopiuj kod
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Kopiuj do schowka</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="text" className="mt-0">
                    <Card className="border border-green-700 rounded-md bg-black bg-opacity-90">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-bold">Opis do wykorzystania z LLM</CardTitle>
                        <CardDescription className="text-gray-300">
                          Tekst opisujący profil, który możesz wykorzystać z modelami językowymi.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96 rounded-md pr-4">
                          {descriptiveText ? (
                            <div className="whitespace-pre-wrap font-mono text-sm bg-black bg-opacity-70 p-4 border border-green-900 rounded-md text-white">
                              {descriptiveText}
                            </div>
                          ) : (
                            <div className="text-center p-8 text-gray-400 border border-green-900 border-dashed rounded-md bg-black bg-opacity-30">
                              <div className="mb-4">Wprowadź kod DNA by wygenerować tekst opisowy.</div>
                              <FileText className="h-12 w-12 mx-auto opacity-30" />
                            </div>
                          )}
                        </ScrollArea>
                      </CardContent>
                      <CardFooter>
                        {descriptiveText && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                onClick={() => copyToClipboard(descriptiveText, "Opis profilu")}
                                variant="outline"
                                className="ml-auto flex items-center border-green-700 hover:bg-green-900 hover:bg-opacity-30"
                              >
                                {copied ? <CopyCheck className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                                Kopiuj opis
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Kopiuj do schowka</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
    
        <footer className="border-t border-green-900 p-4 text-center text-xs bg-black bg-opacity-90">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <p>Profile Coder v1.0</p>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center text-green-500 hover:text-green-400 transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                <span>Strona główna</span>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

export default DNADecoderPage
