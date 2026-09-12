import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  description: string;
  images: string[];
}

const achievementsData: Achievement[] = [
  {
    id: 'developeair-journey',
    title: 'THE JOURNEY OF DEVELOPEAIR',
    thumbnail: 'developeairart.png',
    date: 'October 6, 2025',
    description: `Developeair

Developeair is a technology company built around one simple idea: technology should make ambitious ideas possible.

The idea of Developeair began with a personal ambition to build something meaningful in technology—not just as a single project, but as a long-term company capable of creating innovative products and solving real-world problems.

**The Beginning**

I planned to start Developeair on October 6, 2025—a date that holds special meaning to me because it was also my birthday.

For me, the date represents more than the beginning of a company. It represents the beginning of a long-term journey in technology and entrepreneurship.

The intention was to make my birthday the starting point of something that could continue growing for years to come.

From that initial idea, Developeair began taking shape as a long-term technology company focused on building products, experimenting with new technologies, and eventually creating a broader technology ecosystem.

**Our Vision**

The vision of Developeair is to become a globally recognized technology company that builds products capable of making a real difference in people's everyday lives and professional work.

We believe the future of technology will not be defined by a single application or platform. It will be shaped by interconnected products, intelligent systems, and infrastructure that help people create, work, learn, and communicate more effectively.

Developeair aims to be part of that future.

**What We Build**

Developeair is designed as an umbrella technology company, allowing multiple products and technology initiatives to grow under one ecosystem.

Our areas of interest include:

* Artificial Intelligence
* Software and SaaS
* Developer Tools
* Productivity
* Education Technology
* Digital Platforms
* Research and Data
* Future-focused Technology

Each product may have its own identity and purpose while sharing the same underlying philosophy: build useful technology, keep improving it, and think globally from day one.

**Our Approach**

At Developeair, we value building over simply talking about ideas.

A good idea is only the beginning. Turning that idea into a reliable product requires research, engineering, experimentation, user feedback, and continuous improvement.

Our approach is based on several principles:

**Build with purpose.**
Technology should solve a real problem or create meaningful value.

**Think long-term.**
We want to build products that can grow for years rather than chasing temporary hype.

**Keep learning.**
Technology changes constantly, so continuous learning and experimentation are essential.

**Design for scale.**
Even when starting small, products should be built with the possibility of reaching users beyond a single market.

**Put users first.**
The success of a product ultimately depends on whether it genuinely helps the people using it.

**More Than a Company**

Developeair is intended to become more than a collection of software products.

The long-term goal is to create an ecosystem where different technologies can work together—bringing together products, developers, researchers, creators, and users around a shared vision of building useful technology.

From small experimental projects to large-scale platforms, every project can become a step toward that larger ecosystem.

**The Future**

Developeair is at the beginning of its journey.

There is a long road ahead—from developing the first products and establishing a strong engineering culture to building a global technology ecosystem.

The goal is not simply to create another technology company.

The goal is to build a company that creates technology worth remembering.

Developeair began as an idea connected to a personal milestone—a birthday—and the ambition is for that idea to grow into something far greater over time.

October 6, 2025 — the day I planned to begin building Developeair.

A date. A beginning. A long-term vision.`,
    images: []
  },
  {
    id: 'nhspc-2026',
    title: 'First Contest Medal : NHSPC',
    thumbnail: 'https://i.postimg.cc/52ZZ7ZJD/NHSPC-26.png',
    date: 'June 10, 2026',
    description: "Participating in the National High School Programming Contest (NHSPC) 2026 Regional Round was a turning point in my programming journey, as it was my first-ever programming contest where I achieved a Regional Medal by solving two problems. NHSPC is widely recognized as one of the most prestigious programming contests in the region, serving as a vital platform for young programmers to showcase and refine their algorithmic problem-solving skills.\n\nBeyond the achievement itself, the experience allowed me to truly understand and enjoy the essence of competitive programming. I went through the full cycle of problem-solving—encountering repeated errors, debugging my code multiple times, rethinking my approach after failures, and persistently trying until I found the correct solution. The moment I saw “Accepted” after several attempts brought a deep sense of satisfaction and accomplishment, reinforcing my interest in this field. This contest helped me develop key skills such as logical thinking, debugging under pressure, and resilience, while also shifting my mindset from simply writing code to genuinely enjoying the process of solving problems. To make the experience even more memorable, I celebrated each solved problem by attaching a balloon to my desk, turning progress into a visual and motivating reward system. Overall, this achievement not only marked the beginning of my competitive programming journey but also ignited a lasting passion for tackling challenges and continuously improving myself.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{selectedAchievement.title}</h1>
        <p className="text-slate-500 font-mono text-sm mb-12">{selectedAchievement.date}</p>
        
        <div className="prose prose-invert prose-lg max-w-none">
          {selectedAchievement.description.split('\n\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              <p className="text-slate-300 leading-relaxed">{paragraph}</p>
              {index < selectedAchievement.images.length && (
                <img 
                  src={selectedAchievement.images[index]} 
                  alt={`Achievement context ${index}`} 
                  className="rounded-2xl shadow-2xl my-8 mx-auto w-full max-w-lg aspect-video object-cover border border-white/5"
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
