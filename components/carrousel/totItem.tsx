"use client";

export default function TotItem({
  title,
  subject,
  imageUrl,
}: {
  title: string;
  subject: string;
  imageUrl?: string;
}) {
  return (
    <div className="relative rounded-3xl shadow-lg overflow-hidden w-44 h-44 ml-4 bg-[#5406E2]">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-full object-fit" />
      )}

      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="absolute bottom-0 left-0 p-2 w-full text-white z-10">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm">{subject}</p>
      </div>
    </div>
  );
}
