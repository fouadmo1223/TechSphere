import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const TeamComponnent = () => {
  return (
    
    <section className="py-20 bg-gray-50">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-6"
    >
      <h2 className="text-4xl font-bold text-center mb-4">Meet Our Team</h2>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        The talented people behind our success
      </p>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SwiperSlide key={item}>
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: "#eff6ff", y: -10 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden text-center p-6"
            >
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold mb-1">Team Member {item}</h3>
              <p className="text-gray-600 mb-4">Position {item}</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  </section>
  )
}

export default TeamComponnent
