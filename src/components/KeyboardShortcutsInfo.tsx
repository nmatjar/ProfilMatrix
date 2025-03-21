import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Keyboard } from 'lucide-react'
import { Button } from './ui/button'

export function KeyboardShortcutsInfo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-background/90 p-0 opacity-90 shadow-md hover:opacity-100"
          >
            <Keyboard className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" align="end" className="max-w-[300px]">
          <Card className="border-none shadow-none">
            <CardHeader className="p-2">
              <CardTitle className="text-sm">Skróty klawiszowe</CardTitle>
              <CardDescription className="text-xs">
                Szybka nawigacja między obszarami
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 p-2 text-xs">
              <div className="flex items-center justify-between">
                <span>← →</span>
                <span className="text-muted-foreground">
                  Poprzedni/następny obszar
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>h l</span>
                <span className="text-muted-foreground">
                  Nawigacja w stylu VIM
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>1-9</span>
                <span className="text-muted-foreground">
                  Szybki dostęp do obszaru
                </span>
              </div>
            </CardContent>
          </Card>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
