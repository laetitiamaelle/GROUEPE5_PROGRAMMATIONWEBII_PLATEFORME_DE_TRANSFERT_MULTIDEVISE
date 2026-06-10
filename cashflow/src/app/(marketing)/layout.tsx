import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cash-bg text-white">
      <MarketingHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <MarketingFooter />
    </div>
  );
}
