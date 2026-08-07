import { getQuoteOfDay } from "@/data/quotes";

export default function QuoteOfDay() {
  const quote = getQuoteOfDay();
  return (
    <p className="quote-float">
      {quote.text}
      {quote.source && <span className="quote-source"> — {quote.source}</span>}
    </p>
  );
}
