'use client'
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Typography } from '@mui/material';


const About = () => {
 const events = [
    { year: '2015', event: 'Company Founded', description: 'Started with a small team and big dreams' },
    { year: '2017', event: 'First Product Launch', description: 'Released our flagship product to market' },
    { year: '2019', event: 'Series A Funding', description: 'Secured $5M in funding to expand operations' },
    { year: '2021', event: 'Global Expansion', description: 'Opened offices in 3 new countries' },
    { year: '2023', event: 'Current Milestone', description: 'Serving over 100K customers worldwide' },
  ];

    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 150,
        damping: 10
      }
    }
 };
  return (
    <main style={{overflowX: "hidden"}} className="bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-[#efefef]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Our Story
          </Typography>
          <Typography variant="h5" className="text-gray-600 max-w-2xl">
            Crafting exceptional experiences through innovation and dedication.
          </Typography>
          <motion.div className="mt-12 w-16 h-1 bg-gray-900 mx-auto" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {["Innovation", "Quality", "Customer Satisfaction"].map((title, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2,duration:1 }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p>We strive for {title.toLowerCase()} in everything we do to serve our customers better.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
        <section className="py-20 px-6 bg-white/50">
      <Typography variant="h3" className="text-4xl font-bold text-center mb-12">
        Our Journey
      </Typography>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          {/* Animated Timeline line */}
          <motion.div 
            variants={lineVariants}
            className="absolute left-1/2 h-full w-0.5 bg-gray-300 transform -translate-x-1/2 origin-top"
          />
          
          {events.map((item, index) => (
            <motion.div
             
              key={index}
              variants={itemVariants}
              className={`relative mb-12 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}
            >
              {/* Animated Dot */}
              <motion.div 
                variants={dotVariants}
                className={`absolute top-1/2 w-4 h-4 rounded-full bg-blue-600 transform -translate-y-1/2 ${
                  index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                }`}
              />
              
              {/* Content with hover animation */}
              <motion.div 
              
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg ${
                  index % 2 === 0 ? 'mr-4' : 'ml-4'
                } bg-white shadow-md hover:shadow-lg transition-shadow`}
              >
                <motion.p 
                  className="font-bold text-gray-500"
                  initial={{ x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.year}
                </motion.p>
                <motion.h3 
                  className="text-lg font-bold"
                  initial={{ x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.event}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {["Alice", "Bob", "Charlie", "Dana"].map((name, i) => (
            <motion.div
              key={name}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${name}`}
                alt={name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h4 className="text-lg font-semibold">{name}</h4>
              <p className="text-sm text-gray-600">Role at Company</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values / Stats Section */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What Drives Us</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { label: "Users", value: "100K+" },
            { label: "Projects", value: "250+" },
            { label: "Awards", value: "30+" },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{value}</p>
              <p className="text-gray-700 mt-2">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="max-w-md mx-auto"
        >
          {["Great service!", "Amazing team!", "I love it!"].map((quote, i) => (
            <SwiperSlide key={i} className="bg-white rounded-2xl p-6 shadow-xl text-center">
              <img
                src={`https://ui-avatars.com/api/?name=Client+${i + 1}`}
                alt="Client"
                className="w-12 h-12 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 italic">"{quote}"</p>
              <p className="mt-2 text-sm font-medium text-gray-700">Client {i + 1}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
};

export default About;