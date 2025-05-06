import { motion } from "framer-motion";

export default function BlogComponnent({item}:{item:number}) {
    return(
        <motion.div     
        key={item}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, delay: item * 0.1 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="h-48 bg-gray-300"></div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>May {item}, 2023</span>
            <span className="mx-2">•</span>
            <span>5 min read</span>
          </div>
          <h3 className="text-xl font-bold mb-3">Blog Post Title {item}</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <motion.a
            whileHover={{ x: 5 }}
            href="#" 
            className="text-blue-600 font-semibold hover:underline inline-flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.a>
        </div>
      </motion.div>
    )
}