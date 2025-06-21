
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import Comparateur from "./pages/Comparateur";
import AffaireNouvelleForm from "./components/forms/AffaireNouvelleForm";
import MRHForm from "./components/forms/MRHForm";
import SehassurForm from "./components/forms/SehassurForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/produits/:productId" element={<ProductDetail />} />
          <Route path="/comparateur" element={<Comparateur />} />
          <Route path="/formulaires/affaire-nouvelle" element={<AffaireNouvelleForm />} />
          <Route path="/formulaires/mrh" element={<MRHForm />} />
          <Route path="/formulaires/sehassur" element={<SehassurForm />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
