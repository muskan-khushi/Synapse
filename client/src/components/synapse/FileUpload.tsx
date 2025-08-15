'use client';

import { useState, type DragEvent } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onProcess: (file: File) => void;
  isLoading: boolean;
  statusMessage: string;
}

export function FileUpload({ onProcess, isLoading, statusMessage }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
        setFile(selectedFile);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };
  
  const handleSubmit = () => {
    if (file) {
      onProcess(file);
    } else {
       toast({
        title: 'No file selected',
        description: 'Please select a document to process.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload a PDF document to start chatting about its content.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ease-in-out ${
            isDragging ? 'border-primary bg-accent/10' : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              Drag and drop your file here or
              <label htmlFor="file-upload" className="text-primary font-semibold cursor-pointer hover:underline">
                {' '}
                browse
              </label>
            </p>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.txt" // Accept PDF and TXT for flexibility
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
            />
             {file && <p className="text-sm text-foreground">Selected file: {file.name}</p>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button onClick={handleSubmit} disabled={isLoading || !file} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Upload & Process'
          )}
        </Button>
        {isLoading && statusMessage && <p className="mt-4 text-sm text-muted-foreground">{statusMessage}</p>}
      </CardFooter>
    </Card>
  );
}
