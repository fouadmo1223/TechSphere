import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const PortifolioComponnent = () => {
  return (
    <section className="py-20">
          <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}

          transition={{ duration: 2,when: "beforeChildren", staggerChildren: 1,type: "spring", damping: 4 }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Our Portfolio</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            See some of our recent work
          </p>

          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
            className="mySwiper"
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SwiperSlide key={item}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Project {item}</h3>
                    <p className="text-gray-600">Category {item}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>
  )
}

export default PortifolioComponnent
