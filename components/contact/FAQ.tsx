'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { faqs, FAQ as FAQType } from '@/lib/data/contact'

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'general', name: 'Général' },
    { id: 'support', name: 'Support' },
    { id: 'sales', name: 'Ventes' },
    { id: 'partnership', name: 'Partenariat' }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general':
        return '💬'
      case 'support':
        return '🔧'
      case 'sales':
        return '💰'
      case 'partnership':
        return '🤝'
      default:
        return '❓'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'general':
        return 'bg-blue-100 text-blue-800'
      case 'support':
        return 'bg-green-100 text-green-800'
      case 'sales':
        return 'bg-purple-100 text-purple-800'
      case 'partnership':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Questions Fréquentes
        </CardTitle>
        <CardDescription>
          Trouvez rapidement les réponses à vos questions les plus courantes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Barre de recherche et filtres */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher dans les FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{filteredFAQs.length} question{filteredFAQs.length > 1 ? 's' : ''} trouvée{filteredFAQs.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Liste des FAQ */}
        <div className="space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div key={faq.id} className="border rounded-lg">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto"
                  onClick={() => toggleExpanded(faq.id)}
                >
                  <div className="flex items-start gap-3 text-left">
                    <span className="text-lg">{getCategoryIcon(faq.category)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{faq.question}</h3>
                        {faq.isPopular && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                            Populaire
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(faq.category)}`}>
                        {categories.find(c => c.id === faq.category)?.name}
                      </Badge>
                    </div>
                  </div>
                  {expandedItems.has(faq.id) ? (
                    <ChevronUp className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>
                
                {expandedItems.has(faq.id) && (
                  <div className="px-4 pb-4">
                    <div className="pl-8 border-l-2 border-gray-200">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Aucune question trouvée</h3>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier vos critères de recherche ou contactez-nous directement.
              </p>
            </div>
          )}
        </div>

        {/* CTA pour contact */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
          <h3 className="font-semibold mb-2">Vous ne trouvez pas votre réponse ?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Notre équipe est là pour vous aider avec des réponses personnalisées.
          </p>
          <Button variant="outline">
            Nous contacter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
