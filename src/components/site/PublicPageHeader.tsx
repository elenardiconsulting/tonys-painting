import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import tonysLogo from "@/assets/tonys-logo.png";

const PublicPageHeader = () => {
  return (
    <header className="bg-[#2A2A28] text-white border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" aria-label="Tony's Painting home" className="flex items-center">
          <img
            src={tonysLogo}
            alt="Tony's Painting and Remodeling"
            className="h-[46px] md:h-[56px] w-auto object-contain"
          />
        </Link>
        <span className="text-xs md:text-sm text-white/70 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Private and secure
        </span>
      </div>
    </header>
  );
};

export default PublicPageHeader;
