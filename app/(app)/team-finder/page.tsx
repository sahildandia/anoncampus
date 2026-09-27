import { Search, UserPlus, Users, Briefcase } from "lucide-react";

export default function TeamFinderPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Find Teammates</h1>
          <p className="text-neutral-500 mt-2">Build teams for projects, hackathons, and competitions.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          Post Request
        </button>
      </header>

      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search by skill, technology, or project type..." 
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <select className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500">
          <option>All Categories</option>
          <option>Hackathon</option>
          <option>Academic Project</option>
          <option>Startup Idea</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamListingCard 
          title="AI Attendance System"
          description="Building an automated attendance system using OpenCV and facial recognition. We need someone who is good at React for the dashboard."
          skills={["React", "Tailwind", "UI/UX"]}
          currentSize={2}
          maxSize={4}
          author="Anonymous_472"
        />
        <TeamListingCard 
          title="SIH 2026 - Blockchain Solution"
          description="Looking for a blockchain developer with experience in Solidity for our Smart India Hackathon problem statement."
          skills={["Solidity", "Web3.js", "Node.js"]}
          currentSize={3}
          maxSize={5}
          author="Anonymous_193"
        />
        <TeamListingCard 
          title="College Marketplace App"
          description="Creating an app to buy/sell used books and electronics within the campus. We have the frontend ready, need a backend dev."
          skills={["Node.js", "Express", "MongoDB", "Firebase"]}
          currentSize={2}
          maxSize={3}
          author="Anonymous_821"
        />
        <TeamListingCard 
          title="Competitive Programming Group"
          description="Looking for ICPC teammates. We regularly practice Codeforces Div 2/3. Must be comfortable with Graph algorithms and DP."
          skills={["C++", "Algorithms", "Data Structures"]}
          currentSize={2}
          maxSize={3}
          author="Anonymous_527"
        />
      </div>
    </div>
  );
}

function TeamListingCard({ title, description, skills, currentSize, maxSize, author }: any) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-neutral-300 dark:hover:border-neutral-700 transition flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-medium text-neutral-600 dark:text-neutral-400">
          {author}
        </span>
      </div>
      
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 flex-1">
        {description}
      </p>

      <div className="mb-5">
        <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill: string) => (
            <span key={skill} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Users className="w-4 h-4 text-neutral-500" />
          <span>Team: {currentSize} / {maxSize}</span>
        </div>
        <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm">
          <UserPlus className="w-4 h-4" /> Request to Join
        </button>
      </div>
    </div>
  );
}
