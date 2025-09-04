import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const createClassSymbol = (color) => `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
    <rect width="200" height="200" fill="white"/>
    <circle cx="100" cy="85" r="35" fill="${color}"/>
    <path d="M160 200v-25c0-33.137-26.863-60-60-60s-60 26.863-60 60v25z" fill="${color}"/>
  </svg>
`)}`;

const avatars = [
  {
    id: 1,
    name: '中小学生Placeholder',
    image: createClassSymbol('#EF4444'),
    description: <div className='whitespace-pre-line'>
      ❌ 小学生被变身“卷王”再无快乐童年？<br />
      ❌ 中考分流中职、高职学校孩子就没有前途可言了？<br />
      ❌ 高中生面对高考内卷，名校梦如何实现？<br />
      ❌ 户口、升学政策等影响入学？<br />
      ❌ AI时代，子女缺乏国际化教育环境？<br />
      ❌ 身为家长，面对子女教育与职场挑战的压力？<br />
      <br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> 想改变现在的生活轨迹，去看看世界？<br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> <b>产生了想出国留学或者移民的想法？</b>
      <div className="mt-16 text-center text-orange-500 text-5xl"><b>来新西兰！</b></div>
    </div>,
    shortDescription: '短介绍placeholder',
  },
  {
    id: 2,
    name: '大学生Placeholder',
    image: createClassSymbol('#3B82F6'),
    description: <div className='whitespace-pre-line'>
      😟 初三毕业还没搞清楚情况就被分流到职业高中,与大学失之交臂，似乎人生已成定局？ <br />
      😟 高一、高二已经感觉被“卷”得力不从心，上中国的名牌大学无望=就业无望=人生无望 ？<br />
      😟 大一、大二发现所学专业并不适合,但是国内转专业太难？<br />
      😟 大三、大四已经开始“卷”考研，前途无“亮”；考研一战失利、要接着“二战”？<br />
      😟 二本、三本、大专在读，感觉未来找好就业无望？<br />
      <br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> 想改变现在的生活轨迹，<b>还有可能在国外读北大、清华、复旦、厦门大学这样水平的大学吗？</b><br />
      <div className="mt-16 text-center text-orange-500 text-5xl"><b>完全可以！</b></div>
    </div>,
    shortDescription: '短介绍placeholder',
  },
  {
    id: 3,
    name: '寻求转型的职场中年人',
    image: createClassSymbol('#10B981'),
    description: <div className='whitespace-pre-line'>
      🥴 晋升空间受限，难以突破瓶颈，缺乏进一步发展的机会？ <br />
      🥴 年龄成为职场竞争的隐形门槛，担心被年轻人取代？<br />
      🥴 长期从事单一工作，生活热情逐渐冷却，缺乏新鲜感？<br />
      🥴 担心自身技能不符合行业最新需求，没有机会学习新技能？<br />
      🥴 高强度高压力工作压榨家庭与个人时间？<br />
      <br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> 向往更好的自然环境、教育资源与更有意义的生活方式？<br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> <b>渴望探索新的领域和可能性？</b>
      <div className="mt-16 text-center text-orange-500 text-5xl"><b>还等什么！</b></div>
    </div>,
    shortDescription: '短介绍placeholder',
  },
  {
    id: 4,
    name: 'Placeholder',
    image: createClassSymbol('#F59E0B'),
    description: `长介绍placeholder\nConcerns:\nInterests:`,
    shortDescription: '短介绍placeholder',
  }
];

export const CharacterSelection = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [tutorial, setTutorial] = useState(true);
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (e.currentTarget === e.target) {
      setExpandedId(null);
    }
  };

  const showContent = (e) => {
    e.preventDefault();
    setTutorial(false)
  }

  return (
    // Main container with proper spacing for header and footer
    <main
      className="min-h-[calc(100vh-76px)] mt-[76px] mb-[280px] bg-white"
      onClick={() => expandedId && setExpandedId(null)}
    >
      {tutorial ? (
        <div className="container mx-auto px-4 py-8">
          <p></p>
          <button
            onClick={showContent}
            className="text-blue-400 hover:text-blue-500 border border-blue-400 hover:border-blue-500 px-4 py-2 rounded transition-colors"
          >
            好的
          </button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div
            className="flex justify-center gap-4 min-h-[700px]"
          >
            {avatars.map((avatar) => {
              const isExpanded = expandedId === avatar.id;

              return (
                <motion.div
                  key={avatar.id}
                  layout
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    width: isExpanded ? 800 : 256,
                  }}
                  whileHover={isExpanded ? {} : { scale: 1.05 }}
                  onHoverStart={(e) => {
                    if (isExpanded && e.currentTarget instanceof HTMLElement) {
                      e.currentTarget.style.transform = 'none';
                    }
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                    scale: {
                      type: "tween",
                      duration: 0.1
                    }
                  }}
                  className="relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden"
                  style={{
                    height: 600,
                    cursor: isExpanded ? 'default' : 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    !isExpanded && setExpandedId(avatar.id);
                  }}
                >
                  {isExpanded ? (
                    <div className="flex flex-col h-full">
                      <div className="flex flex-grow">
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="w-1/4 h-full flex flex-col items-center p-4 bg-gray-100"
                        >
                          <div className="flex-grow flex items-center justify-center">
                            <img
                              src={avatar.image}
                              alt={avatar.name}
                              className="w-48 h-48 object-contain"
                            />
                          </div>
                          <h2 className="text-2xl font-bold text-center mt-4">{avatar.name}</h2>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-grow p-4 flex flex-col"
                        >
                          <div>
                            <h3 className="text-xl font-semibold mb-4">你是否感觉......</h3>
                            <pre className="text-gray-600">{avatar.description}</pre>
                          </div>
                        </motion.div>
                      </div>

                      <div className="flex relative">
                        <motion.button
                          animate={{
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: '#4B5563'
                          }}
                          whileHover={{
                            backgroundColor: 'rgba(34, 197, 94, 0.75)',
                            color: 'white'
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-grow py-3 border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                        >
                          初级
                        </motion.button>
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-2/3 pointer-events-none"
                          style={{
                            background: 'linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3), transparent)',
                          }}
                        />
                        <motion.button
                          animate={{
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            color: '#4B5563'
                          }}
                          whileHover={{
                            backgroundColor: 'rgba(59, 130, 246, 0.75)',
                            color: 'white'
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-grow py-3 border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                        >
                          进阶
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex-grow flex items-center justify-center p-4">
                        <img
                          src={avatar.image}
                          alt={avatar.name}
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                      <div className="bg-gray-100 p-4 text-center">
                        <h2 className="text-xl font-bold mb-2">{avatar.name}</h2>
                        <p className="text-gray-600 text-sm">{avatar.shortDescription}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};


const avatarsEN = [
  {
    id: 1,
    name: 'Primary & Secondary Students',
    image: createClassSymbol('#EF4444'),
    description: <div className='whitespace-pre-line'>
      ❌ Primary school students becoming "academic warriors" with no happy childhood left?<br />
      ❌ Middle school streaming to vocational schools means no future for the child?<br />
      ❌ High school students facing intense competition - how to achieve the dream of top universities?<br />
      ❌ Household registration and enrollment policies affecting school admission?<br />
      ❌ In the AI era, children lack an international educational environment?<br />
      ❌ As parents, facing pressure from both children's education and career challenges?<br />
      <br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> Want to change your current life trajectory and see the world?<br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> <b>Have you considered studying abroad or immigrating?</b>
      <div className="mt-16 text-center text-orange-500 text-5xl"><b>Come to New Zealand!</b></div>
    </div>,
    shortDescription: 'Short description placeholder',
  },
  {
    id: 2,
    name: 'University Students',
    image: createClassSymbol('#3B82F6'),
    description: <div className='whitespace-pre-line'>
      😟 Graduated from middle school and got tracked to vocational high school without understanding the situation, missing the chance for university - seems like life is already decided?<br />
      😟 Already feeling overwhelmed by competition in Grade 10 or 11, losing hope for top Chinese universities = no employment = no future?<br />
      😟 Freshman or sophomore discovering that your major isn't suitable, but changing majors in China is too difficult?<br />
      😟 Junior or senior already "grinding" for graduate school entrance exams with no bright future; failed the first attempt and need to try again?<br />
      😟AttendingSecond-tier universities or community colleges, feeling hopeless about finding good employment?<br />
      <br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> Want to change your current life trajectory, <b>is it still possible to attend universities abroad at the level of Peking University, Tsinghua, Fudan, or Xiamen University?</b><br />
      <div className="mt-16 text-center text-orange-500 text-5xl"><b>Absolutely possible!</b></div>
    </div>,
    shortDescription: 'Short description placeholder',
  },
  {
    id: 3,
    name: 'Career-Changing Mid-Career Professionals',
    image: createClassSymbol('#10B981'),
    description: <div className='whitespace-pre-line'>
      🥴 Limited promotion opportunities, unable to break through bottlenecks, lacking chances for further development?<br />
      🥴 Age becoming an invisible barrier in workplace competition, worried about being replaced by younger people?<br />
      🥴 Long-term engagement in monotonous work, gradually losing passion for life, lacking freshness?<br />
      🥴 Worried that your skills don't match the latest industry requirements, with no opportunity to learn new skills?<br />
      🥴 High-intensity, high-pressure work squeezing away family and personal time?<br />
      <br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> Yearning for better natural environment, educational resources, and a more meaningful lifestyle?<br />
      <span style={{ color: 'transparent', textShadow: "0 0 0 rgb(0, 204, 0)" }}>❔</span> <b>Eager to explore new fields and possibilities?</b>
      <div className="mt-16 text-center text-orange-500 text-5xl"><b>What are you waiting for!</b></div>
    </div>,
    shortDescription: 'Short description placeholder',
  },
  {
    id: 4,
    name: 'Placeholder',
    image: createClassSymbol('#F59E0B'),
    description: `Long description placeholder\nConcerns:\nInterests:`,
    shortDescription: 'Short description placeholder',
  }
];

export const CharacterSelectionEN = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [tutorial, setTutorial] = useState(true);
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (e.currentTarget === e.target) {
      setExpandedId(null);
    }
  };

  const showContent = (e) => {
    e.preventDefault();
    setTutorial(false)
  }

  return (
    // Main container with proper spacing for header and footer
    <main
      className="min-h-[calc(100vh-76px)] mt-[76px] mb-[280px] bg-white"
      onClick={() => expandedId && setExpandedId(null)}
    >
      {tutorial ? (
        <div className="container mx-auto px-4 py-8">
          <p></p>
          <button
            onClick={showContent}
            className="text-blue-400 hover:text-blue-500 border border-blue-400 hover:border-blue-500 px-4 py-2 rounded transition-colors"
          >
            Okay
          </button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div
            className="flex justify-center gap-4 min-h-[700px]"
          >
            {avatarsEN.map((avatar) => {
              const isExpanded = expandedId === avatar.id;

              return (
                <motion.div
                  key={avatar.id}
                  layout
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    width: isExpanded ? 800 : 256,
                  }}
                  whileHover={isExpanded ? {} : { scale: 1.05 }}
                  onHoverStart={(e) => {
                    if (isExpanded && e.currentTarget instanceof HTMLElement) {
                      e.currentTarget.style.transform = 'none';
                    }
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                    scale: {
                      type: "tween",
                      duration: 0.1
                    }
                  }}
                  className="relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden"
                  style={{
                    height: 600,
                    cursor: isExpanded ? 'default' : 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    !isExpanded && setExpandedId(avatar.id);
                  }}
                >
                  {isExpanded ? (
                    <div className="flex flex-col h-full">
                      <div className="flex flex-grow">
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="w-1/4 h-full flex flex-col items-center p-4 bg-gray-100"
                        >
                          <div className="flex-grow flex items-center justify-center">
                            <img
                              src={avatar.image}
                              alt={avatar.name}
                              className="w-48 h-48 object-contain"
                            />
                          </div>
                          <h2 className="text-2xl font-bold text-center mt-4">{avatar.name}</h2>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-grow p-4 flex flex-col"
                        >
                          <div>
                            <h3 className="text-xl font-semibold mb-4">Do you feel...</h3>
                            <pre className="text-gray-600">{avatar.description}</pre>
                          </div>
                        </motion.div>
                      </div>

                      <div className="flex relative">
                        <motion.button
                          animate={{
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: '#4B5563'
                          }}
                          whileHover={{
                            backgroundColor: 'rgba(34, 197, 94, 0.75)',
                            color: 'white'
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-grow py-3 border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                        >
                          Beginner
                        </motion.button>
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-2/3 pointer-events-none"
                          style={{
                            background: 'linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3), transparent)',
                          }}
                        />
                        <motion.button
                          animate={{
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            color: '#4B5563'
                          }}
                          whileHover={{
                            backgroundColor: 'rgba(59, 130, 246, 0.75)',
                            color: 'white'
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-grow py-3 border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(null);
                          }}
                        >
                          Advanced
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex-grow flex items-center justify-center p-4">
                        <img
                          src={avatar.image}
                          alt={avatar.name}
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                      <div className="bg-gray-100 p-4 text-center">
                        <h2 className="text-xl font-bold mb-2">{avatar.name}</h2>
                        <p className="text-gray-600 text-sm">{avatar.shortDescription}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};