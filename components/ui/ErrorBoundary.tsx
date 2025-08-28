'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Appeler le callback onError si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Ici vous pourriez envoyer l'erreur à un service de monitoring
    // comme Sentry, LogRocket, etc.
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Si un fallback personnalisé est fourni, l'utiliser
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Fallback par défaut
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-red-600">
                  Oups ! Une erreur s'est produite
                </CardTitle>
                <CardDescription className="text-base">
                  Nous nous excusons pour ce désagrément. Notre équipe a été notifiée.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <p className="font-medium mb-1">Détails techniques :</p>
                <p className="font-mono text-xs break-all">
                  {this.state.error?.message || 'Erreur inconnue'}
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button onClick={this.handleRetry} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer
                </Button>
                <Button onClick={this.handleGoHome} variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook pour gérer les erreurs dans les composants fonctionnels
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error)
    setError(error)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}

// Composant pour afficher les erreurs de manière élégante
interface ErrorDisplayProps {
  error: Error | null
  onRetry?: () => void
  onClear?: () => void
  title?: string
  description?: string
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  onClear, 
  title = "Une erreur s'est produite",
  description = "Impossible de charger le contenu demandé."
}: ErrorDisplayProps) {
  if (!error) return null

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription className="text-red-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-red-700 bg-red-100 p-3 rounded-lg">
          <p className="font-medium mb-1">Message d'erreur :</p>
          <p className="font-mono text-xs break-all">{error.message}</p>
        </div>
        
        <div className="flex gap-2">
          {onRetry && (
            <Button onClick={onRetry} size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
          )}
          {onClear && (
            <Button onClick={onClear} size="sm" variant="ghost">
              Fermer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Composant pour gérer les erreurs de chargement
interface LoadingErrorProps {
  error: Error | null
  isLoading: boolean
  onRetry?: () => void
  children: ReactNode
  errorTitle?: string
  errorDescription?: string
}

export function LoadingError({ 
  error, 
  isLoading, 
  onRetry, 
  children, 
  errorTitle,
  errorDescription 
}: LoadingErrorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement en cours...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={onRetry}
        title={errorTitle}
        description={errorDescription}
      />
    )
  }

  return <>{children}</>
}
