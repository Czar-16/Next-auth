import React from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white py-2">
      <h1 className="text-2xl font-semibold mb-2">Dynamic Profile Page</h1>

      <h2 className="text-lg text-gray-200 font-mono bg-black">{id}</h2>
    </div>
  );
}
