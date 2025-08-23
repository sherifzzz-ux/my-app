import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import OrderSuccess from "./pages/OrderSuccess";
import Promotions from "./pages/Promotions";
import SoinDuVisage from "./pages/SoinDuVisage";
import CorpsBain from "./pages/CorpsBain";
import Maquillage from "./pages/Maquillage";
import Cheveux from "./pages/Cheveux";
import Parfumerie from "./pages/Parfumerie";
import BebeEnfant from "./pages/BebeEnfant";
import KoreanSkincare from "./pages/KoreanSkincare";
import Sexualite from "./pages/Sexualite";
import Parapharmacie from "./pages/Parapharmacie";
import Panier from "./pages/Panier";
import Contact from "./pages/Contact";
import Recherche from "./pages/Recherche";
import Favoris from "./pages/Favoris";
import Compte from "./pages/Compte";
import Commande from "./pages/Commande";
import GrossessePostPartum from "./pages/GrossessePostPartum";
import Marques from "./pages/Marques";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Livraison from "./pages/Livraison";
import Retours from "./pages/Retours";
import FAQ from "./pages/FAQ";
import Aide from "./pages/Aide";
import SuiviCommande from "./pages/SuiviCommande";
import NotFound from "./pages/NotFound";
import MobileFooterNav from "./components/MobileFooterNav";

// Subcategory pages - Soin du Visage
import SoinVisageNettoyants from "./pages/subcategories/SoinVisageNettoyants";
import SoinVisageProtectionSolaire from "./pages/subcategories/SoinVisageProtectionSolaire";
import SoinVisageParProduit from "./pages/subcategories/SoinVisageParProduit";
import SoinVisageSoinsCibles from "./pages/subcategories/SoinVisageSoinsCibles";
import SoinVisageBaumesLevres from "./pages/subcategories/SoinVisageBaumesLevres";
import SoinVisageDemaquillants from "./pages/subcategories/SoinVisageDemaquillants";

// Subcategory pages - Corps & Bain
import CorpsBainGelsDouche from "./pages/subcategories/CorpsBainGelsDouche";
import CorpsBainSoinsCorps from "./pages/subcategories/CorpsBainSoinsCorps";
import CorpsBainBainDouche from "./pages/subcategories/CorpsBainBainDouche";
import CorpsBainEpilation from "./pages/subcategories/CorpsBainEpilation";
import CorpsBainHygieneIntime from "./pages/subcategories/CorpsBainHygieneIntime";
import CorpsBainMainsPieds from "./pages/subcategories/CorpsBainMainsPieds";

// Subcategory pages - Parapharmacie
import ParapharmacieComplementAlimentaire from "./pages/subcategories/ParapharmacieComplementAlimentaire";
import ParapharmacieSoinsVisage from "./pages/subcategories/ParapharmacieSoinsVisage";
import ParapharmacieSoinsCorps from "./pages/subcategories/ParapharmacieSoinsCorps";

// Subcategory pages - Cheveux
import CheveuxComplementsAlimentaires from "./pages/subcategories/CheveuxComplementsAlimentaires";
import CheveuxRoutineCapillaire from "./pages/subcategories/CheveuxRoutineCapillaire";
import CheveuxSoinsCheveux from "./pages/subcategories/CheveuxSoinsCheveux";

// Subcategory pages - Parfumerie
import ParfumerieFemmes from "./pages/subcategories/ParfumerieFemmes";
import ParfumerieHommes from "./pages/subcategories/ParfumerieHommes";
import ParfumerieHuilesBougies from "./pages/subcategories/ParfumerieHuilesBougies";

// Existing subcategory pages
import MaquillageTeint from "./pages/subcategories/MaquillageTeint";
import CheveuxShampoings from "./pages/subcategories/CheveuxShampoings";
import BebeEnfantVisage from "./pages/subcategories/BebeEnfantVisage";

const queryClient = new QueryClient();

import { WishlistProvider } from "@/hooks/useWishlist";
import { PromoProvider } from "@/hooks/usePromoCode";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/hooks/useCart";

function AppContent() {
  const { items, updateQuantity, removeItem, isOpen, setIsOpen } = useCart();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/commande/success" element={<OrderSuccess />} />
        <Route path="/soin-du-visage" element={<SoinDuVisage />} />
        <Route path="/corps-bain" element={<CorpsBain />} />
        <Route path="/maquillage" element={<Maquillage />} />
        <Route path="/cheveux" element={<Cheveux />} />
        <Route path="/parfumerie" element={<Parfumerie />} />
        <Route path="/bebe-enfant" element={<BebeEnfant />} />
        <Route path="/korean-skincare" element={<KoreanSkincare />} />
        <Route path="/sexualite" element={<Sexualite />} />
        <Route path="/parapharmacie" element={<Parapharmacie />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/grossesse-post-partum" element={<GrossessePostPartum />} />
        <Route path="/marques" element={<Marques />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/livraison" element={<Livraison />} />
        <Route path="/retours" element={<Retours />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/aide" element={<Aide />} />
        <Route path="/suivi-commande" element={<SuiviCommande />} />
        
        {/* Subcategory routes - Soin du Visage */}
        <Route path="/soin-du-visage/nettoyants" element={<SoinVisageNettoyants />} />
        <Route path="/soin-du-visage/protection-solaire" element={<SoinVisageProtectionSolaire />} />
        <Route path="/soin-du-visage/par-produit" element={<SoinVisageParProduit />} />
        <Route path="/soin-du-visage/soins-cibles" element={<SoinVisageSoinsCibles />} />
        <Route path="/soin-du-visage/baumes-levres" element={<SoinVisageBaumesLevres />} />
        <Route path="/soin-du-visage/demaquillants-nettoyants" element={<SoinVisageDemaquillants />} />
        
        {/* Subcategory routes - Corps & Bain */}
        <Route path="/corps-bain/gels-douche" element={<CorpsBainGelsDouche />} />
        <Route path="/corps-bain/soins-corps" element={<CorpsBainSoinsCorps />} />
        <Route path="/corps-bain/bain-douche" element={<CorpsBainBainDouche />} />
        <Route path="/corps-bain/epilation" element={<CorpsBainEpilation />} />
        <Route path="/corps-bain/hygiene-intime" element={<CorpsBainHygieneIntime />} />
        <Route path="/corps-bain/mains-pieds" element={<CorpsBainMainsPieds />} />
        
        {/* Subcategory routes - Parapharmacie */}
        <Route path="/parapharmacie/complement-alimentaire" element={<ParapharmacieComplementAlimentaire />} />
        <Route path="/parapharmacie/soins-visage" element={<ParapharmacieSoinsVisage />} />
        <Route path="/parapharmacie/soins-corps" element={<ParapharmacieSoinsCorps />} />
        
        {/* Subcategory routes - Cheveux */}
        <Route path="/cheveux/complements-alimentaires" element={<CheveuxComplementsAlimentaires />} />
        <Route path="/cheveux/routine-capillaire" element={<CheveuxRoutineCapillaire />} />
        <Route path="/cheveux/soins-cheveux" element={<CheveuxSoinsCheveux />} />
        <Route path="/cheveux/shampoings" element={<CheveuxShampoings />} />
        
        {/* Subcategory routes - Parfumerie */}
        <Route path="/parfumerie/femmes" element={<ParfumerieFemmes />} />
        <Route path="/parfumerie/hommes" element={<ParfumerieHommes />} />
        <Route path="/parfumerie/huiles-bougies" element={<ParfumerieHuilesBougies />} />
        
        {/* Other subcategory routes */}
        <Route path="/maquillage/teint" element={<MaquillageTeint />} />
        <Route path="/bebe-enfant/visage" element={<BebeEnfantVisage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MobileFooterNav />
      <CartDrawer 
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <PromoProvider>
        <CartProvider>
          <HelmetProvider>
            <TooltipProvider>
              <div className="min-h-screen pb-16 md:pb-0">
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              </div>
            </TooltipProvider>
          </HelmetProvider>
        </CartProvider>
      </PromoProvider>
    </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
