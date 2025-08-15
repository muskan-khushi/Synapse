'use client';

import { useState } from 'react';
import type { Message } from '@/components/synapse/ChatWindow';
import { FileUpload } from '@/components/synapse/FileUpload';
import { ChatWindow } from '@/components/synapse/ChatWindow';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [documentProcessed, setDocumentProcessed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const { toast } = useToast();

  const handleProcessDocument = async (file: File) => {
    setIsLoading(true);
    setStatusMessage('Uploading and processing document...');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload-document/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const result = await response.json();
      setStatusMessage(result.message);
      
      setMessages([
          { sender: 'ai', text: 'Document processed successfully. You can now ask questions about it.' }
      ]);
      setDocumentProcessed(true); 
    
    } catch (error: any) {
      console.error('Error processing document:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to process the document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!documentProcessed) return;

    const userMessage: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setIsAnswering(true);

    try {
      const response = await fetch('http://localhost:8000/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get answer');
      }

      const result = await response.json();

      const aiMessage: Message = {
        sender: 'ai',
        text: result.answer,
        sources: result.sources ? result.sources.map((s: any) => s.page_content) : [],
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error: any) {
      console.error('Error answering question:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to get an answer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-background text-foreground">
      <div className="w-full max-w-4xl flex flex-col flex-grow h-[calc(100vh-4rem)]">
        <header className="mb-8 flex-shrink-0">
            <h1 className="text-4xl font-bold text-center font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                Synapse
            </h1>
            <p className="text-center text-muted-foreground mt-2">Your intelligent document assistant.</p>
        </header>

        <div className="flex-grow flex flex-col">
          {!documentProcessed ? (
            <div className="flex items-center justify-center h-full">
              <FileUpload onProcess={handleProcessDocument} isLoading={isLoading} statusMessage={statusMessage} />
            </div>
          ) : (
            <ChatWindow messages={messages} onSendMessage={handleSendMessage} isLoading={isAnswering} />
          )}
        </div>
      </div>
    </main>
  );
}
