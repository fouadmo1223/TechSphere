"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div 
      className="w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4"
      style={{ height: 'calc(100vh - 82px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl"
      >
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            {/* Animated GIF Container */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full md:w-1/2"
            >
              <Image
                src="https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif"
                alt="Error animation"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl"
                unoptimized
                priority
              />
            </motion.div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-500">
                  Oops! Not Found
                </h1>
               
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/" className="flex-1">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium shadow-lg hover:shadow-red-500/20 transition-all"
                  >
                    Homepage
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.reload()}
                  className="flex-1 px-6 py-3 bg-gray-700/50 text-gray-200 rounded-lg font-medium border border-gray-600 hover:bg-gray-700 transition-all"
                >
                  Retry
                </motion.button>
              </motion.div>

              <motion.div
                className="pt-6 border-t border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-gray-400">
                  Error code: <span className="font-mono text-gray-300">404</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Background elements */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-red-500/10 blur-3xl"></div>
      </motion.div>
    </div>
  );
}