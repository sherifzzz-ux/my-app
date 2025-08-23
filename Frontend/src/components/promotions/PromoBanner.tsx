import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PromoBannerProps } from '@/types/promo';

export function PromoBanner({ 
  title, 
  subtitle, 
  backgroundImage, 
  ctaText = "Découvrir", 
  ctaLink = "#products-section",
  className = "" 
}: PromoBannerProps) {
  const handleClick = () => {
    if (ctaLink.startsWith('#')) {
      const element = document.getElementById(ctaLink.slice(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = ctaLink;
    }
  };

  return (
    <section className={`relative py-16 overflow-hidden ${className}`}>
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>
      )}
      
      {/* Fallback Background */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary/80">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMyIvPjxjaXJjbGUgY3g9IjEzIiBjeT0iMTMiIHI9IjMiLz48L2c+PC9nPjwvc3ZnPg==')] repeat" />
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-white font-playfair">
            {title}
          </h2>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Call to Action */}
          <div className="pt-4">
            <Button 
              size="lg"
              onClick={handleClick}
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg shadow-glow"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 pt-6">
            <div className="w-12 h-px bg-white/30" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-4 h-4 bg-white/40 rounded-full" />
            <div className="w-2 h-2 bg-white/50 rounded-full" />
            <div className="w-12 h-px bg-white/30" />
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-12 text-background" 
          fill="currentColor" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81c13,21.11,27.64,41.05,47.69,56.24C99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-float" />
      <div className="absolute top-32 right-16 w-6 h-6 bg-white/15 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
    </section>
  );
}