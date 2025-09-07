"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IntelligentSearchBar from "@/components/IntelligentSearchBar";

const StreamlinedHomepage = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [headerShrunk, setHeaderShrunk] = useState(false);

  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], [80, 64]);
  const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trendingSearches = [
    "Sanitized lipsticks",
    "Eco-friendly products", 
    "Luxury foundation",
    "Vegan makeup",
    "Budget sets"
  ];

  const testimonials = [
    {
      id: 1,
      quote: "GetOver transformed my beauty routine! I can try luxury products without the commitment.",
      author: "Sarah M.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0221c9b4-2142-4c36-812f-15a1ae814995.png"
    },
    {
      id: 2,
      quote: "As a host, I've earned over $800 this month sharing my unused makeup collection.",
      author: "Jessica L.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/727d4d5c-664b-462c-a919-27c99703af7f.png"
    },
    {
      id: 3,
      quote: "The hygiene standards are incredible. I feel completely safe using shared products.",
      author: "Maria R.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bc3c88e5-5689-434d-90dd-717ac9de6384.png"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(value.length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E6] via-white to-[#F8E0E6]">
      {/* Streamlined Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#D4AF37]/20 transition-all duration-300"
        style={{ 
          height: headerHeight,
          backgroundColor: useTransform(scrollY, [0, 50], ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.98)'])
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div 
                className="text-2xl font-serif font-bold text-[#D4AF37]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                GetOver
              </motion.div>
            </Link>

            {/* Centered Search Bar */}
            <div className="relative flex-1 max-w-lg mx-8">
              <motion.div
                className={`relative transition-all duration-300 ${
                  searchFocused ? 'scale-105' : ''
                }`}
                animate={searchFocused ? { scale: 1.02 } : { scale: 1 }}
              >
                <input
                  type="text"
                  placeholder="Search sanitized makeup, hosts, brands..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={() => {
                    setTimeout(() => {
                      setSearchFocused(false);
                      setShowSuggestions(false);
                    }, 200);
                  }}
                  className="w-full px-6 py-3 bg-[#F5F0E6] border-2 border-[#D4AF37]/30 rounded-full text-[#333333] placeholder-[#666666] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-all duration-300 shadow-sm focus:shadow-md"
                />
                <motion.div 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  animate={searchFocused ? { rotate: 90 } : { rotate: 0 }}
                >
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Live Search Suggestions */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#D4AF37]/20 rounded-2xl shadow-lg z-50"
                >
                  <div className="p-4">
                    <div className="text-xs text-[#666666] mb-3 px-2 font-medium">Trending searches</div>
                    {trendingSearches
                      .filter(search => search.toLowerCase().includes(searchValue.toLowerCase()))
                      .map((search, index) => (
                        <motion.div
                          key={search}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-4 py-3 hover:bg-[#F5F0E6] rounded-xl cursor-pointer text-[#333333] transition-all duration-200 hover:scale-102"
                          onClick={() => {
                            setSearchValue(search);
                            setShowSuggestions(false);
                          }}
                        >
                          {search}
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }} 
                  whileTap={{ scale: 0.95, y: 0 }}
                >
                  <Button 
                    variant="outline" 
                    className="border-2 border-[#D4AF37] text-[#333333] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 rounded-full px-6 py-2 font-medium shadow-sm hover:shadow-md"
                  >
                    Login
                  </Button>
                </motion.div>
              </Link>
              <Link href="/auth/signup">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }} 
                  whileTap={{ scale: 0.95, y: 0 }}
                >
                  <Button className="bg-[#D4AF37] text-white hover:bg-[#B8941F] transition-all duration-300 rounded-full px-6 py-2 font-medium shadow-md hover:shadow-lg">
                    Register
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F8E0E6] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-6xl lg:text-7xl font-serif font-bold text-[#333333] leading-tight mb-6">
                Beauty,{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
                  Safely Shared
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-[#666666] leading-relaxed font-light max-w-3xl mx-auto"
            >
              Discover premium beauty products from trusted hosts in your community. 
              Safe, sanitized, and affordable luxury makeup experiences.
            </motion.p>

            {/* Primary CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/marketplace">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  className="relative overflow-hidden group"
                >
                  <Button 
                    size="lg" 
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-10 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full relative overflow-hidden"
                  >
                    <span className="relative z-10">Find Makeup Near You</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#B8941F] to-[#D4AF37]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/host-onboarding">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                >
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="border-2 border-[#D4AF37] text-[#333333] hover:bg-[#D4AF37] hover:text-white px-10 py-4 text-xl font-semibold transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                  >
                    Start Hosting
                    <span className="ml-2 text-sm bg-[#F8E0E6] text-[#D4AF37] px-2 py-1 rounded-full">
                      Earn $50+/month
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trending Searches */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 pt-8"
            >
              <span className="text-[#666666] font-medium">Trending:</span>
              {trendingSearches.slice(0, 3).map((search, index) => (
                <motion.div
                  key={search}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white border border-[#D4AF37]/30 rounded-full text-sm text-[#333333] cursor-pointer hover:bg-[#F5F0E6] hover:border-[#D4AF37] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {search}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white/50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#F8E0E6] text-[#D4AF37] border-[#D4AF37]/30 mb-6 font-medium px-4 py-2">
              Why Choose GetOver?
            </Badge>
            <h2 className="text-5xl font-serif font-bold text-[#333333] mb-6">
              Premium Beauty Experience
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed">
              Experience beauty sharing like never before with our innovative platform designed for safety, 
              community, and premium quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧼",
                title: "Hygiene First",
                description: "MoCRA compliant sanitation protocols ensure every product meets the highest safety standards.",
                delay: 0
              },
              {
                icon: "👥",
                title: "Trusted Community",
                description: "Connect with verified hosts and beauty enthusiasts in your area through our rating system.",
                delay: 0.1
              },
              {
                icon: "💎",
                title: "Premium Access",
                description: "Access high-end makeup brands and professional-grade products at a fraction of the cost.",
                delay: 0.2
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="border border-[#D4AF37]/20 bg-white hover:bg-[#F5F0E6]/50 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center pb-6">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-[#F5F0E6] to-[#F8E0E6] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-4xl">{feature.icon}</span>
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-[#333333] mb-4">{feature.title}</CardTitle>
                    <p className="text-[#666666] leading-relaxed">
                      {feature.description}
                    </p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-r from-[#F5F0E6] to-[#F8E0E6]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif font-bold text-[#333333] mb-6">
              What Our Community Says
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-12">
                  <blockquote className="text-2xl text-[#333333] font-light italic mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].author}
                      className="w-16 h-16 rounded-full border-2 border-[#D4AF37] shadow-md"
                    />
                    <div>
                      <div className="font-semibold text-[#333333] text-lg">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-[#666666]">Verified User</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#D4AF37] scale-125' : 'bg-[#D4AF37]/30'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* User Intent Guidance */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* For Clients */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <Badge className="bg-[#F8E0E6] text-[#D4AF37] border-[#D4AF37]/30 mb-4">
                  For Beauty Lovers
                </Badge>
                <h3 className="text-4xl font-serif font-bold text-[#333333] mb-6">
                  Discover Your Next Favorite Product
                </h3>
                <p className="text-xl text-[#666666] leading-relaxed mb-8">
                  Browse verified hosts near you and try premium makeup before you buy. 
                  Safe, sanitized, and affordable access to luxury beauty.
                </p>
              </div>
              
              <Link href="/marketplace">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    Browse Hosts Nearby
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* For Hosts */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <Badge className="bg-[#F5F0E6] text-[#D4AF37] border-[#D4AF37]/30 mb-4">
                  For Hosts
                </Badge>
                <h3 className="text-4xl font-serif font-bold text-[#333333] mb-6">
                  Turn Your Collection Into Income
                </h3>
                <p className="text-xl text-[#666666] leading-relaxed mb-6">
                  Share your unused makeup and earn money. Join our community of trusted hosts.
                </p>
                <div className="bg-[#F8E0E6] p-4 rounded-xl border border-[#D4AF37]/20">
                  <p className="text-[#333333] font-medium">
                    💡 <strong>Quick FAQ:</strong> No inventory? Start with 1 item—we'll guide you!
                  </p>
                </div>
              </div>
              
              <Link href="/host-onboarding">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    List Your First Product
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default StreamlinedHomepage;
