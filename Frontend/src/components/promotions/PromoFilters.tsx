import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, SortAsc, Tag, X } from 'lucide-react';
import { categories } from '@/lib/mock-data';

interface PromoFiltersProps {
  categories: string[];
  discountRanges: string[];
  selectedCategory: string;
  selectedDiscount: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onDiscountChange: (discount: string) => void;
  onSortChange: (sort: string) => void;
}

export function PromoFilters({
  categories: categoryIds,
  discountRanges,
  selectedCategory,
  selectedDiscount,
  sortBy,
  onCategoryChange,
  onDiscountChange,
  onSortChange,
}: PromoFiltersProps) {
  const getCategoryName = (id: string) => {
    const categoryMap: { [key: string]: string } = {
      'all': 'Toutes catégories',
      'visage': 'Visage',
      'corps': 'Corps',
      'cheveux': 'Cheveux',
      'parfums': 'Parfums',
      'maquillage': 'Maquillage',
    };
    return categoryMap[id] || id;
  };

  const getDiscountName = (range: string) => {
    if (range === 'all') return 'Toutes réductions';
    if (range === '50') return '50% et plus';
    return `${range}% - ${parseInt(range) + 9}%`;
  };

  const getSortName = (sort: string) => {
    const sortMap: { [key: string]: string } = {
      'discount': 'Réduction décroissante',
      'price-low': 'Prix croissant',
      'price-high': 'Prix décroissant',
      'savings': 'Économies décroissantes',
    };
    return sortMap[sort] || sort;
  };

  const clearAllFilters = () => {
    onCategoryChange('all');
    onDiscountChange('all');
    onSortChange('discount');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedDiscount !== 'all' || sortBy !== 'discount';

  return (
    <Card id="products-section" className="mb-8 shadow-soft">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Title */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Filtres</h3>
          </div>

          {/* Filters */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Tag className="w-4 h-4" />
                Catégorie
              </label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categoryIds.map((categoryId) => (
                    <SelectItem key={categoryId} value={categoryId}>
                      {getCategoryName(categoryId)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Discount Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <span className="text-urgent">%</span>
                Réduction
              </label>
              <Select value={selectedDiscount} onValueChange={onDiscountChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une réduction" />
                </SelectTrigger>
                <SelectContent>
                  {discountRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {getDiscountName(range)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <SortAsc className="w-4 h-4" />
                Trier par
              </label>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un tri" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Réduction décroissante</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                  <SelectItem value="savings">Économies décroissantes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="self-start"
            >
              <X className="w-4 h-4 mr-2" />
              Effacer
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Filtres actifs:</span>
            
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => onCategoryChange('all')}>
                {getCategoryName(selectedCategory)}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            
            {selectedDiscount !== 'all' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => onDiscountChange('all')}>
                {getDiscountName(selectedDiscount)}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            
            {sortBy !== 'discount' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => onSortChange('discount')}>
                {getSortName(sortBy)}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
          </div>
        )}

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-sm text-muted-foreground">Filtres rapides:</span>
          
          <Button
            variant={selectedDiscount === '50' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onDiscountChange('50')}
            className="text-xs"
          >
            50%+ de réduction
          </Button>
          
          <Button
            variant={selectedCategory === 'visage' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('visage')}
            className="text-xs"
          >
            Soins Visage
          </Button>
          
          <Button
            variant={sortBy === 'savings' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSortChange('savings')}
            className="text-xs"
          >
            Meilleures économies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}