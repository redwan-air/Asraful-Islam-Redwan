import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Asraful Islam Redwan",
        "jobTitle": "Programmer & Independent Builder",
        "description": "Programmer and independent builder exploring software development, technology, and digital products.",
        "url": "https://air-redwan.cyou/about"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-16">
          
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Asraful Islam Redwan</h1>
            <p className="text-xl md:text-2xl text-blue-400 font-medium">Programmer & Independent Builder</p>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              I explore technology by building things. My work revolves around software development, digital products, and solving practical problems through code.
            </p>
          </div>

          {/* Education & Focus */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Education</h3>
              <p className="text-lg text-white font-semibold">Govt. Madan Mohan College</p>
              <p className="text-sm text-slate-500">Intermediate Studies · 2025–Present</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Current Focus</h3>
              <p className="text-lg text-white font-semibold">Software Development</p>
              <p className="text-sm text-slate-500">Web Technologies · Digital Products</p>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Philosophy */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Philosophy</h2>
            <blockquote className="text-2xl font-light text-blue-200 italic border-l-4 border-blue-500 pl-6 py-2">
              "Understand the problem. Build the solution. Learn from the result."
            </blockquote>
            <p className="text-lg text-slate-300 leading-relaxed">
              I believe the best way to understand technology is to experiment with it. I document the ideas I explore, the challenges I encounter, the solutions I test, and the products I build along the way.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              My journey is not just about writing code. It is about developing the ability to turn problems into practical solutions.
            </p>
          </div>

          {/* Process & Goal */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">PROCESS</h3>
              <div className="p-8 rounded-3xl bg-blue-900/10 border border-blue-500/20">
                <h4 className="text-lg font-bold text-blue-400 mb-2">Build to Learn</h4>
                <p className="text-slate-300">I learn by experimenting, solving problems, and building real projects.</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">GOAL</h3>
              <div className="p-8 rounded-3xl bg-blue-900/10 border border-blue-500/20">
                <h4 className="text-lg font-bold text-blue-400 mb-2">Long-Term Growth</h4>
                <p className="text-slate-300">Develop strong engineering fundamentals and build useful technology that creates lasting value.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;