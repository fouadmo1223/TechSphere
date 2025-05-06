'use client';

import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';



const Footer = () => {
  const controls = useAnimation();


  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    }
  };

  // Social media icons data
  const socialIcons = [
    { name: 'Facebook', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
    { name: 'Twitter', path: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
    { name: 'GitHub', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
    { name: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
  ];

  // Footer links data
  const footerLinks = [
    {
      title: 'Services',
      items: ['1on1 Coaching', 'Company Review', 'Accounts Review', 'HR Consulting', 'SEO Optimisation']
    },
    {
      title: 'Company',
      items: ['About', 'Meet the Team', 'Careers', 'Blog', 'Press']
    },
    {
      title: 'Helpful Links',
      items: ['Contact', 'FAQs', 'Live Chat', 'Documentation', 'Support']
    },
    {
      title: 'Legal',
      items: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Accessibility']
    }
  ];

  return (
    <footer  className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
        
          className="lg:flex lg:items-start lg:gap-8"
        >
          {/* Logo Section */}
          <motion.div  className="col-span-2">
            <motion.div
             variants={itemVariants}
              initial="hidden"
             animate="visible"
              className="mb-4"
            >
              <Link href="/" className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                <span className="mr-2 text-indigo-600 dark:text-indigo-400">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" fill="url(#paint0_angular)"/>
                    <defs>
                      <radialGradient id="paint0_angular" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 16) rotate(90) scale(14)">
                        <stop stopColor="#6366F1"/>
                        <stop offset="1" stopColor="#8B5CF6"/>
                      </radialGradient>
                    </defs>
                  </svg>
                </span>
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" style={{opacity:"1 !important"}}>
                  TechSphere
                </span>
              </Link>
            </motion.div>
            <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400">
              Empowering your digital journey with cutting-edge solutions and innovative technology.
            </motion.p>
          </motion.div>

          {/* Links Sections */}
          <motion.div 
            variants={containerVariants}
            className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-4 lg:gap-y-16"
          >
            {footerLinks.map((section, index) => (
              <motion.div key={index} variants={itemVariants} className="col-span-2 sm:col-span-1">
                <motion.p variants={itemVariants} className="font-medium text-gray-900 dark:text-white">
                  {section.title}
                </motion.p>
                <motion.ul variants={containerVariants} className="mt-6 space-y-4 text-sm">
                  {section.items.map((item, itemIndex) => (
                    <motion.li key={itemIndex} variants={itemVariants}>
                      <a href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-200">
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1,
              transition: { delay: 0.4 }
            }
          }}
          className="mt-12 flex justify-center"
        >
          <motion.ul 
            variants={containerVariants}
            className="flex gap-6"
          >
            {socialIcons.map((social, index) => (
              <motion.li key={index} variants={itemVariants}>
                <a 
                  href="#" 
                  rel="noreferrer" 
                  target="_blank" 
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d={social.path} clipRule="evenodd" />
                  </svg>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          
          className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800"
        >
          <div className="sm:flex sm:justify-between">
            <motion.p 
             
              className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left"
            >
              © {new Date().getFullYear()} TechSphere. All rights reserved.
            </motion.p>

            <motion.ul 
            
              className="mt-4 flex flex-wrap justify-center gap-4 text-xs sm:mt-0 sm:justify-end"
            >
              {['Terms & Conditions', 'Privacy Policy', 'Cookies'].map((item, index) => (
                <motion.li key={index} >
                  <a href="#" className="text-gray-500 transition hover:opacity-75 dark:text-gray-400">
                    {item}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;