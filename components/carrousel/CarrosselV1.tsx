"use client";
import TotItem from "./totItem";

export default function Carousel({ items }: { items: Array<{ title: string, subject: string, imageUrl?: string }> }) {
  return (
    <div className="flex overflow-x-scroll space-x-4 py-4 scrollbar-hide">
      {items.map((item, index) => (
        <div key={index} className="min-w-44">
          <TotItem title={item.title} subject={item.subject} imageUrl={item.imageUrl} />
        </div>
      ))}
    </div>
  );
}
