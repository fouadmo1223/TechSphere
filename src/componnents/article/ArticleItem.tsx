import { motion } from 'framer-motion';
import Link from 'next/link';
import {Article} from "@/utils/types";

interface ArticleProps {
  article:Article,
  index?:number
}

export default function ArticleItem({article,index}:ArticleProps) {

    const articleVariants = {
      hidden: { 
        opacity: 0, 
        x: -50,
        transition: {
          type: "spring",
          stiffness: 100
        } 
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.5
        }
      }
    };

  return (
     <motion.article
            key={article.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ 
              once: true,
              margin: "0px 0px -100px 0px"
            }}
            variants={articleVariants}
            custom={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                {article.body}
              </p>
              <motion.div
                whileHover="hover"
                className="self-start"
              >
                <Link 
                  href={`/articles/${article.id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Details
                  <motion.span
                    className="ml-2"
                    variants={{
                      hover: {
                        x: [0, 5, 0],
                        transition: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }
                    }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.article>
  )
}
