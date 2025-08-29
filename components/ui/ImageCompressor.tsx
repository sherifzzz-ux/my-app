"use client";

import { useState, useRef, useCallback } from "react";
import { FileDown, Download, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CompressionOptions {
  quality: number; // 0-100
  maxWidth: number;
  maxHeight: number;
  format: 'jpeg' | 'png' | 'webp';
  autoCompress: boolean;
}

interface CompressedImage {
  blob: Blob;
  url: string;
  size: number;
  originalSize: number;
  compressionRatio: number;
  dimensions: { width: number; height: number };
}

interface ImageCompressorProps {
  file: File;
  onCompress: (compressedImage: CompressedImage) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function ImageCompressor({
  file,
  onCompress,
  onCancel,
  isOpen
}: ImageCompressorProps) {
  const [compressionOptions, setCompressionOptions] = useState<CompressionOptions>({
    quality: 80,
    maxWidth: 1200,
    maxHeight: 1200,
    format: 'jpeg',
    autoCompress: true
  });
  
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string>('');
  const [originalInfo, setOriginalInfo] = useState<{
    size: number;
    dimensions: { width: number; height: number };
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Charger l'aperçu de l'image originale
  const loadPreview = useCallback(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalInfo({
          size: file.size,
          dimensions: { width: img.naturalWidth, height: img.naturalHeight }
        });
        setPreview(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [file]);

  // Compresser l'image
  const compressImage = useCallback(async () => {
    if (!canvasRef.current || !preview) return;

    setIsCompressing(true);
    setProgress(0);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      // Calculer les nouvelles dimensions
      let { width, height } = img.naturalWidth > img.naturalHeight
        ? { width: compressionOptions.maxWidth, height: (img.naturalHeight * compressionOptions.maxWidth) / img.naturalWidth }
        : { width: (img.naturalWidth * compressionOptions.maxHeight) / img.naturalHeight, height: compressionOptions.maxHeight };

      // S'assurer que les dimensions ne dépassent pas l'original
      if (width > img.naturalWidth) width = img.naturalWidth;
      if (height > img.naturalHeight) height = img.naturalHeight;

      // Configurer le canvas
      canvas.width = width;
      canvas.height = height;

      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, width, height);

      setProgress(50);

      // Convertir en blob avec compression
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setProgress(100);
            
            const compressedImage: CompressedImage = {
              blob,
              url: URL.createObjectURL(blob),
              size: blob.size,
              originalSize: file.size,
              compressionRatio: ((file.size - blob.size) / file.size) * 100,
              dimensions: { width, height }
            };

            setTimeout(() => {
              setIsCompressing(false);
              onCompress(compressedImage);
            }, 500);
          }
        },
        `image/${compressionOptions.format}`,
        compressionOptions.quality / 100
      );
    };

    img.src = preview;
  }, [preview, compressionOptions, file.size, onCompress]);

  // Charger l'aperçu au montage
  useState(() => {
    if (isOpen) {
      loadPreview();
    }
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            					<FileDown className="h-5 w-5" />
					Compression d'image
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Informations sur l'image originale */}
          {originalInfo && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <Label className="text-sm font-medium">Taille originale</Label>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(originalInfo.size)}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Dimensions</Label>
                <p className="text-sm text-muted-foreground">
                  {originalInfo.dimensions.width} × {originalInfo.dimensions.height}px
                </p>
              </div>
            </div>
          )}

          {/* Aperçu de l'image */}
          {preview && (
            <div className="text-center">
              <Label className="text-sm font-medium mb-2 block">Aperçu</Label>
              <img
                src={preview}
                alt="Aperçu de l'image"
                className="max-w-full max-h-64 object-contain mx-auto rounded-lg border"
              />
            </div>
          )}

          {/* Options de compression */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-compress" className="text-sm font-medium">
                Compression automatique
              </Label>
              <Switch
                id="auto-compress"
                checked={compressionOptions.autoCompress}
                onCheckedChange={(checked) => 
                  setCompressionOptions(prev => ({ ...prev, autoCompress: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Qualité: {compressionOptions.quality}%
              </Label>
              <Slider
                value={[compressionOptions.quality]}
                onValueChange={([value]) => 
                  setCompressionOptions(prev => ({ ...prev, quality: value }))
                }
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-width" className="text-sm font-medium">Largeur max</Label>
                <input
                  id="max-width"
                  type="number"
                  value={compressionOptions.maxWidth}
                  onChange={(e) => 
                    setCompressionOptions(prev => ({ 
                      ...prev, 
                      maxWidth: parseInt(e.target.value) || 1200 
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="100"
                  max="4000"
                  placeholder="1200"
                  title="Largeur maximale de l'image en pixels"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-height" className="text-sm font-medium">Hauteur max</Label>
                <input
                  id="max-height"
                  type="number"
                  value={compressionOptions.maxHeight}
                  onChange={(e) => 
                    setCompressionOptions(prev => ({ 
                      ...prev, 
                      maxHeight: parseInt(e.target.value) || 1200 
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  min="100"
                  max="4000"
                  placeholder="1200"
                  title="Hauteur maximale de l'image en pixels"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="output-format" className="text-sm font-medium">Format de sortie</Label>
              <select
                id="output-format"
                value={compressionOptions.format}
                onChange={(e) => 
                  setCompressionOptions(prev => ({ 
                    ...prev, 
                    format: e.target.value as 'jpeg' | 'png' | 'webp' 
                  }))
                }
                className="w-full px-3 py-2 border rounded-md text-sm"
                title="Format de sortie de l'image compressée"
              >
                <option value="jpeg">JPEG (recommandé)</option>
                <option value="png">PNG (sans perte)</option>
                <option value="webp">WebP (moderne)</option>
              </select>
            </div>
          </div>

          {/* Barre de progression */}
          {isCompressing && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Compression en cours...</Label>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Conseils */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Conseils de compression :</p>
                <ul className="space-y-1 text-xs">
                  <li>• JPEG : Idéal pour les photos, compression avec perte</li>
                  <li>• PNG : Parfait pour les logos, compression sans perte</li>
                  <li>• WebP : Format moderne, meilleur rapport qualité/taille</li>
                  <li>• Qualité 80-90% : Bon compromis qualité/taille</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel} disabled={isCompressing}>
              Annuler
            </Button>
            <Button 
              onClick={compressImage} 
              disabled={isCompressing || !preview}
              className="min-w-[120px]"
            >
              {isCompressing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Compression...
                </>
              ) : (
                <>
                  					<FileDown className="h-4 w-4 mr-2" />
					Compresser
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Canvas caché pour le traitement */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
