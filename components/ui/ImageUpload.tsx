"use client";

import { useState, useRef, useCallback } from "react";
import { X, Image as ImageIcon, AlertCircle, CheckCircle, Crop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/uploadthing.config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImageCropper } from "./ImageCropper";

interface ImageValidation {
  isValid: boolean;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
  errors: string[];
}

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  className?: string;
  // Nouvelles propriétés de validation
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  aspectRatio?: number; // ratio largeur/hauteur (ex: 1 pour carré, 16/9 pour paysage)
  showValidation?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  maxFiles = 1,
  maxSize = 4 * 1024 * 1024, // 4MB
  accept = ["image/*"],
  className = "",
  minWidth = 100,
  maxWidth = 2000,
  minHeight = 100,
  maxHeight = 2000,
  aspectRatio,
  showValidation = true
}: ImageUploadProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [validation, setValidation] = useState<ImageValidation | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation d'image avant upload
  const validateImage = useCallback((file: File): Promise<ImageValidation> => {
    return new Promise((resolve) => {
      const errors: string[] = [];
      
      // Validation de la taille
      if (file.size > maxSize) {
        errors.push(`Taille trop importante (${Math.round(file.size / 1024 / 1024)}MB > ${Math.round(maxSize / 1024 / 1024)}MB)`);
      }

      // Validation du format
      const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validFormats.includes(file.type)) {
        errors.push(`Format non supporté: ${file.type}`);
      }

      // Validation des dimensions
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        
        if (width < minWidth || width > maxWidth) {
          errors.push(`Largeur invalide: ${width}px (min: ${minWidth}px, max: ${maxWidth}px)`);
        }
        
        if (height < minHeight || height > maxHeight) {
          errors.push(`Hauteur invalide: ${height}px (min: ${minHeight}px, max: ${maxHeight}px)`);
        }

        // Validation du ratio d'aspect
        if (aspectRatio) {
          const currentRatio = width / height;
          const tolerance = 0.1;
          if (Math.abs(currentRatio - aspectRatio) > tolerance) {
            errors.push(`Ratio d'aspect invalide: ${currentRatio.toFixed(2)} (attendu: ${aspectRatio})`);
          }
        }

        resolve({
          isValid: errors.length === 0,
          width,
          height,
          size: file.size,
          format: file.type,
          errors
        });
      };
      
      img.onerror = () => {
        resolve({
          isValid: false,
          errors: ['Impossible de lire les dimensions de l\'image']
        });
      };

      img.src = URL.createObjectURL(file);
    });
  }, [maxSize, minWidth, maxWidth, minHeight, maxHeight, aspectRatio]);

  const handleUploadComplete = (res: any) => {
    if (res && res[0] && res[0].url) {
      onChange(res[0].url);
      setIsUploading(false);
      setValidation(null);
      toast({
        title: "Upload réussi",
        description: "L'image a été uploadée avec succès",
      });
    }
  };

  const handleUploadError = (error: Error) => {
    setIsUploading(false);
    setValidation(null);
    toast({
      title: "Erreur d'upload",
      description: error.message || "Une erreur est survenue lors de l'upload",
      variant: "error",
    });
  };

  const handleUploadBegin = () => {
    setIsUploading(true);
    setValidation(null);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationResult = await validateImage(file);
    setValidation(validationResult);

    if (validationResult.isValid) {
      // Si l'image est valide, on peut procéder à l'upload
      // Ici on pourrait ajouter la logique de recadrage si nécessaire
      toast({
        title: "Image valide",
        description: `Dimensions: ${validationResult.width}x${validationResult.height}px`,
      });
    } else {
      toast({
        title: "Image invalide",
        description: validationResult.errors.join(', '),
        variant: "error",
      });
    }
  };

  const getValidationIcon = () => {
    if (!validation) return null;
    return validation.isValid ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getValidationColor = () => {
    if (!validation) return "text-muted-foreground";
    return validation.isValid ? "text-green-600" : "text-red-600";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone d'upload UploadThing */}
      {!value && (
        <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
          <UploadDropzone
            endpoint="imageUploader"
            onUploadBegin={handleUploadBegin}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              border-muted-foreground/25 hover:border-muted-foreground/50
            `}
            appearance={{
              label: "Glissez-déposez une image ici ou cliquez pour sélectionner",
              allowedContent: `PNG, JPG, GIF, WebP jusqu'à ${Math.round(maxSize / 1024 / 1024)}MB`,
              button: "Sélectionner une image"
            }}
          />
          
          {/* Bouton de sélection manuelle avec validation */}
          <div className="mt-2 text-center">
            <span className="text-sm text-muted-foreground">ou</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="ml-2"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Valider une image
            </Button>
            <label htmlFor="image-file-input" className="sr-only">
              Sélectionner une image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept.join(',')}
              onChange={handleFileSelect}
              className="hidden"
              title="Sélectionner une image"
              aria-label="Sélectionner une image"
              id="image-file-input"
            />
          </div>
        </div>
      )}

      {/* Aperçu de l'image */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Aperçu"
            className="h-32 w-32 object-cover rounded-lg border shadow-sm"
          />
          <div className="absolute -top-2 -right-2 flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowCrop(!showCrop)}
              disabled={disabled}
              className="h-6 w-6 p-0 rounded-full shadow-md bg-white"
              title="Recadrer l'image"
              aria-label="Recadrer l'image"
            >
              <Crop className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onRemove}
              disabled={disabled}
              className="h-6 w-6 p-0 rounded-full shadow-md"
              title="Supprimer l'image"
              aria-label="Supprimer l'image"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Validation des images */}
      {showValidation && validation && (
        <Alert className={validation.isValid ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          {getValidationIcon()}
          <AlertDescription className={getValidationColor()}>
            <div className="font-medium">
              {validation.isValid ? "Image valide" : "Image invalide"}
            </div>
            {validation.width && validation.height && (
              <div className="text-sm">
                Dimensions: {validation.width} × {validation.height}px
              </div>
            )}
            {validation.errors.length > 0 && (
              <ul className="text-sm mt-1 list-disc list-inside">
                {validation.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Indicateur d'upload en cours */}
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Upload en cours...</span>
        </div>
      )}

      {/* Informations détaillées */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Formats acceptés : PNG, JPG, GIF, WebP</p>
        <p>• Taille maximale : {Math.round(maxSize / 1024 / 1024)}MB</p>
        <p>• Dimensions : {minWidth}×{minHeight}px à {maxWidth}×{maxHeight}px</p>
        {aspectRatio && (
          <p>• Ratio d'aspect : {aspectRatio === 1 ? "carré" : aspectRatio === 16/9 ? "paysage" : aspectRatio}</p>
        )}
        <p>• Nombre maximum : {maxFiles} fichier(s)</p>
      </div>

      {/* Composant de recadrage */}
      {value && (
        <ImageCropper
          imageUrl={value}
          onCrop={(croppedImageUrl) => {
            onChange(croppedImageUrl);
            setShowCrop(false);
            toast({
              title: "Image recadrée",
              description: "Le recadrage a été appliqué avec succès",
            });
          }}
          onCancel={() => setShowCrop(false)}
          aspectRatio={aspectRatio}
          isOpen={showCrop}
        />
      )}
    </div>
  );
}
