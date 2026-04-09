'use client';

interface MarqueeProps {
  text: string;
  repeat?: number;
  speed?: number;
  separator?: string;
  className?: string;
}

export default function Marquee({
  text,
  repeat = 6,
  speed = 25,
  separator = ' \u00B7 ',
  className = '',
}: MarqueeProps) {
  const items = Array.from({ length: repeat }, () => text).join(separator) + separator;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block pr-4">{items}</span>
        <span className="inline-block pr-4">{items}</span>
      </div>
    </div>
  );
}
