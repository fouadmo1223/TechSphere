import { motion } from "framer-motion"


const FeaturesComponnet = () => {
  return (
   <section className="py-20">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}

          transition={{ duration: 2,when: "beforeChildren", staggerChildren: 1,type: "spring", damping: 4 }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Our Features</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover what makes us different
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 0.80, backgroundColor: "#eff6ff", y: 10 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15, }}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Feature {item}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
  )
}

export default FeaturesComponnet
