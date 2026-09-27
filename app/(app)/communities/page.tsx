import { Users, MessagesSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CommunitiesPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Communities</h1>
          <p className="text-neutral-500 mt-2">Join conversations around your department, year, and interests.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          Create Community
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CommunityCard 
          name="General" 
          description="Everything and anything related to campus life."
          members={1204}
          category="General"
        />
        <CommunityCard 
          name="Computer Science" 
          description="CSE department discussions, assignments, and doubts."
          members={542}
          category="Department"
        />
        <CommunityCard 
          name="Placements 2027" 
          description="Preparation, interview experiences, and off-campus opportunities."
          members={890}
          category="Placements"
        />
        <CommunityCard 
          name="Hackathons & Coding" 
          description="Find teams and discuss upcoming hackathons."
          members={312}
          category="Tech"
        />
        <CommunityCard 
          name="ECE 2nd Year" 
          description="Specific discussion group for ECE batch 2024-2028."
          members={145}
          category="Department"
        />
        <CommunityCard 
          name="Gaming" 
          description="Valorant, BGMI, and general gaming discussions."
          members={420}
          category="Interest"
        />
      </div>
    </div>
  );
}

function CommunityCard({ name, description, members, category }: any) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-blue-500 transition group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:scale-105 transition">
          <Users className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
          {category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-1">
        {description}
      </p>
      
      <div className="flex justify-between items-center pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-4 text-sm text-neutral-500 font-medium">
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {members}</span>
          <span className="flex items-center gap-1.5"><MessagesSquare className="w-4 h-4" /> Chat</span>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm">
          Join <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
