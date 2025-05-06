'use client';

import { Article } from "@/utils/types";
import { motion } from 'framer-motion';
import ArticleItem from '@/componnents/article/ArticleItem';

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.length>0?articles.map((article, index) => (
        <ArticleItem 
          key={`${article.title}-${index}`} 
          article={article} 
          index={index} 
        />
      )):(
        <h2 className=" text-3xl text-center font-bold text-blue-300">There is No Articles</h2>
      )}
    </div>
  );
}