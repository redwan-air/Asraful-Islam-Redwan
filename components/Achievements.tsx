import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  images: string[];
}

const achievementsData: Achievement[] = [
  {
    id: 'nhspc-2026',
    title: 'First Contest Medal : NHSPC',
    thumbnail: 'https://i.postimg.cc/52ZZ7ZJD/NHSPC-26.png',
    description: "Participating in the National High School Programming Contest (NHSPC) 2026 Regional Round was a turning point in my programming journey, as it was my first-ever programming contest where I achieved a Regional Medal by solving two problems. Beyond the achievement itself, the experience allowed me to truly understand and enjoy the essence of competitive programming. I went through the full cycle of problem-solving—encountering repeated errors, debugging my code multiple times, rethinking my approach after failures, and persistently trying until I found the correct solution. The moment I saw “Accepted” after several attempts brought a deep sense of satisfaction and accomplishment, reinforcing my interest in this field. This contest helped me develop key skills such as logical thinking, debugging under pressure, and resilience, while also shifting my mindset from simply writing code to genuinely enjoying the process of solving problems. To make the experience even more memorable, I celebrated each solved problem by attaching a balloon to my desk, turning progress into a visual and motivating reward system. Overall, this achievement not only marked the beginning of my competitive programming journey but also ignited a lasting passion for tackling challenges and continuously improving myself.",
    images: [
      "https://i.postimg.cc/BntYGNNn/702190400-122243363864047337-4649943769379417913-n.jpg",
      "https://i.postimg.cc/G3Qq8652/700252926-122243363918047337-5207860341879541138-n.jpg",
      "https://i.postimg.cc/G3Qq8652/700252926-122243363918047337-5207860341879541138-n.jpg"
    ]
  }
];

const Achievements: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  if (selectedAchievement) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 pt-32 pb-24"
      >
        <button 
          onClick={() => setSelectedAchievement(null)}
          className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Back to Achievements
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">{selectedAchievement.title}</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          {selectedAchievement.description.split('\n\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className="text-slate-300 leading-relaxed">{paragraph}</p>
              {index < selectedAchievement.images.length && (
                <img 
                  src={selectedAchievement.images[index]} 
                  alt={`Achievement context ${index}`} 
                  className="rounded-2xl shadow-xl my-8 w-full"
                  referrerPolicy="no-referrer"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievementsData.map((achievement) => (
          <motion.button
            key={achievement.id}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedAchievement(achievement)}
            className="group block text-left bg-slate-950 rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all"
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={achievement.thumbnail} 
                alt={achievement.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white tracking-tight">{achievement.title}</h2>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
