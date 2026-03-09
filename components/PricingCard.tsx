"use client";

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  frequency: string;
  features: string[];
  highlight?: boolean;
}

export default function PricingCard({
  title,
  subtitle,
  price,
  frequency,
  features,
  highlight,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 hover-lift ${highlight
          ? "gradient-border bg-[var(--surface-elevated)]"
          : "card"
        }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full text-xs font-bold gradient-brand text-white shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
          {title}
        </h3>
        <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-extrabold text-[var(--text-primary)]">
          {price}
        </span>
        <span className="text-[var(--text-muted)] text-sm ml-1">
          {frequency}
        </span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke={highlight ? "var(--brand-light)" : "var(--brand)"}
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[var(--text-secondary)]">{f}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${highlight
            ? "btn-primary"
            : "btn-secondary"
          }`}
      >
        {title === "Free" ? "Get Started" : "Subscribe Now"}
      </button>
    </div>
  );
}
