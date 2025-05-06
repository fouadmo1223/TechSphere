import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'; 

const TestimonialsComponnent = () => {
  return (
    <section className="py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Don't just take our word for it
          </p>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            className="mySwiper"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide key={item} className="max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Client {item}</h4>
                    <p className="text-gray-600">CEO, Company {item}</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

  )
}

export default TestimonialsComponnent
