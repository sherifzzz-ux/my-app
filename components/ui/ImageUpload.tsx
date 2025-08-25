"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  maxFiles = 1,
  maxSize = 4 * 1024 * 1024, // 4MB
  accept = ["image/*"],
  className = ""
}: ImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Simuler l'upload pour l'instant
    // TODO: Remplacer par l'upload Uploadthing réel
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      setIsUploading(false);
      
      toast({
        title: "Image téléchargée",
        description: "L'image a été téléchargée avec succès",
      });
    };
    
    reader.readAsDataURL(file);
  }, [onChange, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
    maxSize,
    disabled: disabled || isUploading,
  });

  const handleUploadComplete = (res: { url: string }) => {
    onChange(res.url);
    toast({
      title: "Upload réussi",
      description: "L'image a été uploadée avec succès",
    });
  };

  const handleUploadError = (error: Error) => {
    toast({
      title: "Erreur d'upload",
      description: error.message || "Une erreur est survenue lors de l'upload",
      variant: "destructive",
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone de drag & drop */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? "border-primary bg-primary/5" 
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Upload en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {isDragActive ? "Déposez l'image ici" : "Glissez-déposez une image ici"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ou cliquez pour sélectionner
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF jusqu'à {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        )}
      </div>

      {/* Aperçu de l'image */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Aperçu"
            className="h-32 w-32 object-cover rounded-lg border shadow-sm"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemove}
            disabled={disabled}
            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full shadow-md"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Informations */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Formats acceptés : PNG, JPG, GIF, WebP</p>
        <p>• Taille maximale : {Math.round(maxSize / 1024 / 1024)}MB</p>
        <p>• Nombre maximum : {maxFiles} fichier(s)</p>
      </div>
    </div>
  );
}
