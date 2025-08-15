'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Send, Loader2, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
}

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export function ChatWindow({ messages, onSendMessage, isLoading }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full flex-grow bg-card border rounded-xl shadow-lg">
      <ScrollArea className="flex-grow p-4 md:p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-xl bg-card border max-w-lg shadow-sm">
                  <p className="text-muted-foreground italic text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background/50 rounded-b-xl">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            ref={textAreaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="w-full pr-24 py-3 text-base resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <p className="text-xs text-muted-foreground hidden md:block">
                <kbd className="inline-flex items-center gap-1">
                  Shift <CornerDownLeft className="h-3 w-3" /> for new line
                </kbd>
             </p>
             <Button type="submit" size="icon" disabled={isLoading || !inputText.trim()}>
                <Send className="h-4 w-4" />
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
