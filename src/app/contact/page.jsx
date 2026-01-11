"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!submitted) return;

    if (countdown === 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [submitted, countdown, router]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white selection:bg-pink-500 selection:text-white">
      <Header />

      {/* HERO */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-600 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-700 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            Contact CoinTrace
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Have a question, feedback, or business inquiry? We’d love to hear
            from you.
          </p>
        </div>
      </section>

      {/* CONTACT CARD */}
      <section className="px-6 pb-28">
        <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 shadow-2xl">
          <SignedOut>
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🔒</div>

              <h2 className="text-3xl font-bold mb-4">Sign in to Contact Us</h2>

              <p className="text-gray-300 mb-8 leading-relaxed">
                You need to be logged in to send us a message. This helps us
                respond faster and keep communication secure.
              </p>

              <SignInButton mode="modal">
                <button className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-xl">
                  🔐 Sign In / Create Account
                </button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            {!submitted ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* NAME */}
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                    />
                  </div>

                  {/* SUBJECT */}
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="General inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="block mb-2 text-gray-300 font-medium">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white resize-none"
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-pink-500/40"
                  >
                    ✉️ Send Message
                  </button>
                </form>
              </>
            ) : (
              /* SUCCESS STATE */
              <div className="text-center py-12">
                <div className="text-6xl mb-6">✅</div>
                <h2 className="text-3xl font-bold mb-4">
                  Message Sent Successfully
                </h2>
                <p className="text-gray-300 leading-relaxed max-w-md mx-auto">
                  Thank you for contacting CoinTrace. Our team has received your
                  message and will respond shortly.
                </p>

                {/* Countdown */}
                <p className="text-sm text-gray-400 mb-6">
                  Redirecting to home in{" "}
                  <span className="text-pink-400 font-semibold">
                    {countdown}
                  </span>{" "}
                  seconds...
                </p>

                {/* Manual Back Button */}
                <button
                  onClick={() => router.push("/")}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  ⬅ Back to Home
                </button>

                <div className="mt-8 text-sm text-gray-400">
                  ⏱ Typical response time: within 24 hours
                </div>
              </div>
            )}
          </SignedIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
