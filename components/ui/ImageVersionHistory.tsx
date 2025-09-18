"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { History, RotateCcw, Trash2, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ImageVersion {
  id: string;
  url: string;
  thumbnail: string;
  size: number;
  dimensions: { width: number; height: number };
  format: string;
  createdAt: Date;
  description?: string;
  isCurrent: boolean;
}

interface ImageVersionHistoryProps {
  brandId: string;
  currentImageUrl?: string | null;
  onRestoreVersion: (version: ImageVersion) => void;
  onDeleteVersion: (versionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageVersionHistory({
  brandId,
  currentImageUrl,
  onRestoreVersion,
  onDeleteVersion,
  isOpen,
  onClose
}: ImageVersionHistoryProps) {
  const [versions, setVersions] = useState<ImageVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<ImageVersion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simuler le chargement des versions (à remplacer par un appel API réel)
  const loadVersions = useCallback(async () => {
    setIsLoading(true);
    
    // Simulation d'un délai de chargement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Données simulées - à remplacer par un appel API réel
    const mockVersions: ImageVersion[] = [
      {
        id: "1",
        url: currentImageUrl || "/placeholder-logo.png",
        thumbnail: currentImageUrl || "/placeholder-logo.png",
        size: 245760, // 240KB
        dimensions: { width: 400, height: 400 },
        format: "PNG",
        createdAt: new Date(),
        description: "Version actuelle",
        isCurrent: true
      },
      {
        id: "2",
        url: "/placeholder-logo-v2.png",
        thumbnail: "/placeholder-logo-v2.png",
        size: 512000, // 500KB
        dimensions: { width: 800, height: 800 },
        format: "PNG",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 jour ago
        description: "Version précédente - haute résolution",
        isCurrent: false
      },
      {
        id: "3",
        url: "/placeholder-logo-v3.png",
        thumbnail: "/placeholder-logo-v3.png",
        size: 102400, // 100KB
        dimensions: { width: 200, height: 200 },
        format: "JPEG",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 semaine ago
        description: "Version compressée",
        isCurrent: false
      }
    ];
    
    setVersions(mockVersions);
    setIsLoading(false);
  }, [brandId]);

  useEffect(() => {
    if (isOpen) {
      loadVersions();
    }
  }, [isOpen, loadVersions]);

  const handleRestoreVersion = (version: ImageVersion) => {
    onRestoreVersion(version);
    toast({
      title: "Version restaurée",
      description: `La version du ${version.createdAt.toLocaleDateString()} a été restaurée`,
    });
    onClose();
  };

  const handleDeleteVersion = async (versionId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette version ?")) {
      onDeleteVersion(versionId);
      setVersions(prev => prev.filter(v => v.id !== versionId));
      toast({
        title: "Version supprimée",
        description: "La version a été supprimée avec succès",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    if (diffInHours < 168) return `Il y a ${Math.floor(diffInHours / 24)}j`;
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historique des versions d&apos;image
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Informations sur la marque */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Marque ID: {brandId}</h3>
            <p className="text-sm text-muted-foreground">
              Gestion de l&apos;historique des logos et images de cette marque
            </p>
          </div>

          {/* Liste des versions */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Chargement...</span>
              </div>
            ) : versions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Aucune version trouvée</p>
              </div>
            ) : (
              versions.map((version) => (
                <Card key={version.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <Image
                          src={version.thumbnail}
                          alt={`Version ${version.id}`}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      </div>
                      
                      {/* Informations */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                Version {version.id}
                              </span>
                              {version.isCurrent && (
                                <Badge variant="default" className="text-xs">
                                  Actuelle
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {version.format}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {version.description || "Aucune description"}
                            </p>
                          </div>
                          
                          <div className="text-right text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(version.createdAt)}
                            </div>
                            <p>{formatFileSize(version.size)}</p>
                            <p>{version.dimensions.width}×{version.dimensions.height}px</p>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedVersion(version)}
                            className="h-8 px-3"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Aperçu
                          </Button>
                          
                          {!version.isCurrent && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRestoreVersion(version)}
                                className="h-8 px-3"
                              >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Restaurer
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteVersion(version.id)}
                                className="h-8 px-3 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Supprimer
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Actions globales */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {versions.length} version{versions.length > 1 ? 's' : ''} au total
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
              <Button onClick={loadVersions} disabled={isLoading}>
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Modal d'aperçu */}
      {selectedVersion && (
        <Dialog open={!!selectedVersion} onOpenChange={() => setSelectedVersion(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Aperçu de la version</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="text-center">
                <Image
                  src={selectedVersion.url}
                  alt={`Version ${selectedVersion.id}`}
                  width={800}
                  height={600}
                  className="max-w-full max-h-96 object-contain mx-auto rounded-lg border"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Format:</span> {selectedVersion.format}
                </div>
                <div>
                  <span className="font-medium">Taille:</span> {formatFileSize(selectedVersion.size)}
                </div>
                <div>
                  <span className="font-medium">Dimensions:</span> {selectedVersion.dimensions.width}×{selectedVersion.dimensions.height}px
                </div>
                <div>
                  <span className="font-medium">Créée:</span> {selectedVersion.createdAt.toLocaleString('fr-FR')}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedVersion(null)}>
                  Fermer
                </Button>
                {!selectedVersion.isCurrent && (
                  <Button onClick={() => handleRestoreVersion(selectedVersion)}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restaurer cette version
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
