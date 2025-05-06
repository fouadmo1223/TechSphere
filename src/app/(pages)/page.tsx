'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { useState } from 'react';
import cloudImage from '../../../public/cloud-hosting.png';
import Image from 'next/image'
import BlogComponnent from '@/componnents/homePage/BlogComponnent';
import StatsComponnent from '@/componnents/homePage/StatsComponnent';
import TeamComponnent from '@/componnents/homePage/TeamComponnent';
import PortifolioComponnent from '@/componnents/homePage/PortifolioComponnent';
import TestimonialsComponnent from '@/componnents/homePage/TestimonialsComponnent';
import FeaturesComponnet from '@/componnents/homePage/FeaturesComponnet';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const router = useRouter()
  const pricingPlans = [
    {
      name: "Basic",
      price: "$9.99",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Pro",
      price: "$19.99",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      name: "Enterprise",
      price: "$29.99",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
  ];

  const handlePlanSelect = (index) => {
    setSelectedPlan(index === selectedPlan ? null : index);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Transparent BG Image */}
      <section
        className="flex flex-col md:flex-row items-center justify-between min-h-[calc(100vh-82px)] px-6 py-12 md:py-0 "
        style={{ background: "#efefef" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Welcome to Our <span className="text-blue-600">Creative</span> Space
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing content and services tailored just for you. Our
            platform offers the best solutions for your needs.
          </p>
          <motion.button
            onClick={() => router.push("/articles")}
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb", x: 10 }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-3 cursor-pointer border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:text-white transition-colors"
          >
            Discover More
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
        >
          <Image
            src={cloudImage}
            alt="Hero Image"
            className="w-full max-w-md object-contain"
          />
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, when: "beforeChildren" }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Pricing Plans</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, x: 1 }}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanSelect(index)}
                className={`p-8 rounded-xl shadow-lg bg-white cursor-pointer transition-all ${
                  selectedPlan === index
                    ? "border-2 border-blue-600"
                    : "border-2 border-transparent"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 cursor-pointer bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Hover Cards */}
      <FeaturesComponnet />

      {/* Testimonials Section with Swiper */}
      <TestimonialsComponnent />
      {/* Slider 2 - Portfolio */}
      <PortifolioComponnent />

      {/* Slider 3 - Team */}
      <TeamComponnent />

      {/* Stats Section with Hover Cards */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Users" },
              { number: "500+", label: "Projects" },
              { number: "50+", label: "Team Members" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <StatsComponnent
                key={stat.label + index}
                stat={stat}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Section with Hover Cards */}
      <section className="py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Latest From Our Blog
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Stay updated with our latest news and articles
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <BlogComponnent key={item + "blog"} item={item} />
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}