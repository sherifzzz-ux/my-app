'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Badge } from './badge'
import { Button } from './button'
import { CheckCircle, XCircle, Smartphone, Monitor } from 'lucide-react'

export function FooterNavigationDemo() {
  return (
    <div className="space-y-8">
      {/* Problème résolu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 text-success mr-2" />
            Problème du Footer Mobile Résolu
          </CardTitle>
          <CardDescription>
            Le menu footer est maintenant visible sur toutes les tailles d'écran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avant */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <h4 className="font-semibold text-destructive">AVANT</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Desktop : Footer mobile caché</span>
                  <Badge variant="destructive">Problème</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Mobile : Footer mobile visible</span>
                  <Badge variant="secondary">OK</Badge>
                </div>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">
                    <strong>Problème :</strong> La classe <code className="bg-destructive/20 px-1 rounded">md:hidden</code> cachait le footer sur desktop
                  </p>
                </div>
              </div>
            </div>

            {/* Après */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <h4 className="font-semibold text-success">APRÈS</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Desktop : Footer mobile visible</span>
                  <Badge variant="secondary">Résolu</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Mobile : Footer mobile visible</span>
                  <Badge variant="secondary">OK</Badge>
                </div>
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm text-success">
                    <strong>Solution :</strong> Suppression de <code className="bg-success/20 px-1 rounded">md:hidden</code> + améliorations UX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Améliorations apportées */}
      <Card>
        <CardHeader>
          <CardTitle>🔧 Améliorations Apportées</CardTitle>
          <CardDescription>
            Modifications techniques pour résoudre le problème
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Suppression de md:hidden
                </h4>
                <p className="text-sm text-muted-foreground">
                  Le footer mobile est maintenant visible sur tous les écrans
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Largeur responsive
                </h4>
                <p className="text-sm text-muted-foreground">
                  <code>max-w-md mx-auto md:max-w-2xl</code> pour une meilleure adaptation
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Animations hover
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ajout de <code>hover-lift</code> pour les micro-interactions
                </p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 text-success mr-2" />
                  Padding bottom
                </h4>
                <p className="text-sm text-muted-foreground">
                  <code>pb-20</code> sur le main pour éviter le chevauchement
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions de test */}
      <Card>
        <CardHeader>
          <CardTitle>🧪 Comment Tester</CardTitle>
          <CardDescription>
            Vérifiez que le footer mobile est maintenant visible partout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Test Desktop</h4>
                <ol className="text-sm space-y-1 text-muted-foreground">
                  <li>1. Ouvrez le site sur un écran large</li>
                  <li>2. Vérifiez que le footer mobile est visible en bas</li>
                  <li>3. Testez les liens de navigation</li>
                  <li>4. Vérifiez les animations hover</li>
                </ol>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Test Mobile</h4>
                <ol className="text-sm space-y-1 text-muted-foreground">
                  <li>1. Réduisez la taille de la fenêtre</li>
                  <li>2. Ou testez sur un appareil mobile</li>
                  <li>3. Vérifiez que le footer reste visible</li>
                  <li>4. Testez la navigation tactile</li>
                </ol>
              </div>
            </div>
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-sm text-accent">
                <strong>Note :</strong> Le footer mobile est maintenant fixe en bas de l'écran sur toutes les tailles d'écran, 
                offrant une navigation rapide et accessible.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
