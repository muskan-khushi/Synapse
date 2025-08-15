'use client'

import { Bot, User, BookOpen, Check, Copy } from 'lucide-react';
import type { Message } from './ChatWindow';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { sender, text, sources } = message;
  const isUser = sender === 'user';
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({ title: 'Copied to clipboard' });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={cn('group flex items-start gap-3 md:gap-4', isUser ? 'justify-end' : '')}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}
      
      <div className={cn(
        'relative max-w-lg rounded-xl px-4 py-3 shadow-sm',
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-card border'
      )}>
        <p className="whitespace-pre-wrap text-sm md:text-base">{text}</p>
        
        {!isUser && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        )}

        {sources && sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/50">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <BookOpen className="h-4 w-4" />
                    <span>Sources</span>
                    <Badge variant="secondary">{sources.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pb-0">
                  <div className="space-y-2">
                  {sources.map((source, index) => (
                    <p key={index} className="text-xs text-muted-foreground border-l-2 border-primary/50 pl-3 py-1 italic">
                      "{source}"
                    </p>
                  ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center border">
          <User className="w-5 h-5 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
}
