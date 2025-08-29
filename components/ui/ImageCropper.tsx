"use client";

import { useState, useRef, useCallback } from "react";
import { X, RotateCcw, ZoomIn, ZoomOut, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import "./ImageCropper.css";

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedImageUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
  isOpen: boolean;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ImageCropper({
  imageUrl,
  onCrop,
  onCancel,
  aspectRatio = 1,
  isOpen
}: ImageCropperProps) {
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 200, height: 200 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Vérifier si le clic est dans la zone de recadrage
    if (x >= cropArea.x && x <= cropArea.x + cropArea.width &&
        y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  }, [cropArea]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragStart.x;
    const y = e.clientY - rect.top - dragStart.y;
    
    // Limiter la zone de recadrage dans les limites du canvas
    const maxX = canvasRef.current.width - cropArea.width;
    const maxY = canvasRef.current.height - cropArea.height;
    
    setCropArea(prev => ({
      ...prev,
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY))
    }));
  }, [isDragging, dragStart, cropArea.width, cropArea.height]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleCrop = useCallback(() => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Créer un canvas temporaire pour le recadrage
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;
    
    // Dessiner la zone recadrée
    ctx.drawImage(
      imageRef.current,
      cropArea.x / scale,
      cropArea.y / scale,
      cropArea.width / scale,
      cropArea.height / scale,
      0,
      0,
      cropArea.width,
      cropArea.height
    );
    
    // Convertir en URL de données
    const croppedImageUrl = canvas.toDataURL('image/png');
    onCrop(croppedImageUrl);
  }, [cropArea, scale, onCrop]);

  const resetTransformations = useCallback(() => {
    setScale(1);
    setRotation(0);
    setCropArea({ x: 0, y: 0, width: 200, height: 200 });
  }, []);

  const handleImageLoad = useCallback(() => {
    if (!imageRef.current || !canvasRef.current) return;
    
    const img = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajuster la taille du canvas à l'image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    // Centrer la zone de recadrage
    const centerX = (canvas.width - cropArea.width) / 2;
    const centerY = (canvas.height - cropArea.height) / 2;
    
    setCropArea(prev => ({
      ...prev,
      x: centerX,
      y: centerY
    }));
  }, [cropArea.width, cropArea.height]);

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Recadrer l'image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Contrôles */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Zoom:</span>
              <Slider
                value={[scale]}
                onValueChange={([value]) => setScale(value)}
                min={0.5}
                max={3}
                step={0.1}
                className="w-24"
              />
              <span className="text-sm w-8">{Math.round(scale * 100)}%</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Rotation:</span>
              <Slider
                value={[rotation]}
                onValueChange={([value]) => setRotation(value)}
                min={-180}
                max={180}
                step={1}
                className="w-24"
              />
              <span className="text-sm w-12">{rotation}°</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetTransformations}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
          
          {/* Zone de recadrage */}
          <div className="relative border rounded-lg overflow-hidden bg-muted">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="cursor-move"
            />
            
            {/* Image de fond (cachée) pour le recadrage */}
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Image à recadrer"
              onLoad={handleImageLoad}
              className="hidden"
            />
            
            {/* Zone de recadrage visible */}
            <div
              className={`crop-area crop-area-positioned crop-area-size-200 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                '--crop-x': `${cropArea.x}px`,
                '--crop-y': `${cropArea.y}px`
              } as React.CSSProperties}
            >
              {/* Poignées de redimensionnement */}
              <div className="crop-handle top-left" />
              <div className="crop-handle top-right" />
              <div className="crop-handle bottom-left" />
              <div className="crop-handle bottom-right" />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button onClick={handleCrop}>
              <Check className="h-4 w-4 mr-2" />
              Appliquer le recadrage
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
