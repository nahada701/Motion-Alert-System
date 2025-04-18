import ObjectDetction from "@/components/object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <h1 className="gradient-title text-2xl md:text-3xl lg:text-4xl font-extrabold  "> Motion Alert System</h1>
     
        {/* webcam */}
       <ObjectDetction></ObjectDetction>
        {/* canvas */}
  
    </main>
  );
}
