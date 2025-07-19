'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteData } from '@/constants/my-site';
import PostCardList from '@/components/post/PostCardList';
import { getMainPosts } from '@/datasets/post';
import { GlassContainer } from '@/components/ui';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const texts = ['학습하고 기록', '개발하고 성장', '고민하고 해결'];

export default function Home() {
  const posts = getMainPosts();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // 처음 시작할 때 1초 딜레이
    const startDelay = currentTextIndex === 0 ? 1000 : 0;

    const startTimer = setTimeout(() => {
      const currentText = texts[currentTextIndex];
      let i = 0;

      const typeTimer = setInterval(() => {
        if (i < currentText.length) {
          setDisplayText(currentText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
          setIsTyping(false);

          // 2초 후 다음 텍스트로 넘어감
          setTimeout(() => {
            setIsTyping(true);
            setDisplayText('');
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }, 2000);
        }
      }, 120);

      return () => clearInterval(typeTimer);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [currentTextIndex]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      <div className="pt-6">
        <GlassContainer
          className="p-6 sm:p-8 mb-12 overflow-hidden relative"
          variant="primary"
          animated={isVisible}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>

          <motion.div
            className="flex items-center sm:justify-between flex-wrap flex-col sm:flex-row relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <div className="order-2 sm:order-1 text-center sm:text-start mt-4 sm:mt-0 w-full sm:w-auto">
              <motion.div variants={childVariants}>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {siteData.auhtor.name}
                </h1>
              </motion.div>

              <motion.div variants={childVariants}>
                <motion.div
                  className="text-lg sm:text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-4 relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Frontend Developer
                </motion.div>
              </motion.div>

              <motion.div variants={childVariants}>
                <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed min-h-[3.5rem] sm:min-h-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-2"
                  >
                    좋은 사용자 경험을 위해{' '}
                    <motion.span
                      className="text-indigo-600 dark:text-indigo-400 font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      {displayText}
                      {isTyping && (
                        <span className="animate-pulse ml-1 text-indigo-500">
                          |
                        </span>
                      )}
                    </motion.span>
                    합니다.
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 w-full sm:w-auto"
                variants={childVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Blog
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/series"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 glass-light border border-glass-light hover:glass-medium text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200 backdrop-blur-md"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Series
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <div className="relative order-1 sm:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
                <Image
                  src={siteData.auhtor.profile}
                  alt="profile"
                  width={140}
                  height={140}
                  priority
                  className="rounded-2xl relative z-10 shadow-xl border-4 border-white/50 dark:border-gray-800/50"
                />
              </div>
            </div>
          </motion.div>
        </GlassContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Latest Posts
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-30"></div>
          </div>

          <PostCardList posts={posts} />

          <motion.div
            className="w-full flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Link
                href="/blog"
                className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-indigo-500/25"
              >
                <span className="mr-3">모든 포스트 보기</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </Link>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
