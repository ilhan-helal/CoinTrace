import { Hero } from "@/components/layout/Hero";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
        <main className="min-h-screen  bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900">
      <Header />
      <Hero />
      <Footer />
    </main>
  )
}
