'use client'

import { useState } from 'react'
import { GuideCard } from './GuideCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Grid3X3, List, Filter, X, BookOpen, User, Clock } from 'lucide-react'
import { GuideArticle, guideCategories, difficultyLevels, popularTags } from '@/lib/data/guide-beaute'

interface GuidesGridProps {
  articles: GuideArticle[]
  showFilters?: boolean
  showSearch?: boolean
  showSort?: boolean
  showViewToggle?: boolean
}

export function GuidesGrid({ 
  articles, 
  showFilters = true, 
  showSearch = true, 
  showSort = true, 
  showViewToggle = true 
}: GuidesGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)

  // Filtrer les articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             (selectedDifficulty === 'debutant' && article.difficulty === 'débutant') ||
                             (selectedDifficulty === 'intermediaire' && article.difficulty === 'intermédiaire') ||
                             (selectedDifficulty === 'avance' && article.difficulty === 'avancé')
    
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag)
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTag
  })

  // Trier les articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.views - a.views
      case 'likes':
        return b.likes - a.likes
      case 'date':
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      case 'readTime':
        return a.readTime - b.readTime
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedDifficulty !== 'all',
    selectedTag !== 'all'
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      {(showSearch || showFilters || showSort || showViewToggle) && (
        <div className="space-y-4">
          {/* Recherche */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Barre d'outils */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Bouton filtres */}
              {showFilters && (
                <Button
                  variant="outline"
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              )}

              {/* Tri */}
              {showSort && (
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularité</SelectItem>
                    <SelectItem value="likes">J&apos;aime</SelectItem>
                    <SelectItem value="date">Date de publication</SelectItem>
                    <SelectItem value="readTime">Temps de lecture</SelectItem>
                    <SelectItem value="title">Titre (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Toggle vue */}
            {showViewToggle && (
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Panel de filtres */}
          {showFilters && showFiltersPanel && (
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filtres</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFiltersPanel(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Catégorie */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Catégorie</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {guideCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulté */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Niveau</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name} ({level.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tag */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Tag</label>
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les tags</SelectItem>
                      {popularTags.map((tag) => (
                        <SelectItem key={tag.id} value={tag.id}>
                          {tag.name} ({tag.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Résultats */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {sortedArticles.length} article{sortedArticles.length > 1 ? 's' : ''} trouvé{sortedArticles.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille d'articles */}
      {sortedArticles.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {sortedArticles.map((article) => (
            <GuideCard key={article.id} article={article} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun article trouvé avec ces critères.</p>
        </div>
      )}
    </div>
  )
}
