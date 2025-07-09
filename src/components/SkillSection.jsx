import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
   { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Bootstrap", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "frontend" },
  { name: "Thymeleaf", level: 70, category: "frontend" },,

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "Java", level: 90, category: "backend" },
  { name: "Spring Boot", level: 90, category: "backend" },
   { name: "PHP", level: 75, category: "backend" },
  { name: "Laravel", level: 75, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  //devops
{ name: "Docker", level: 85, category: "devops" },
  { name: "Git", level: 90, category: "devops" },
  { name: "Jenkins", level: 75, category: "devops" },
  { name: "CI/CD", level: 80, category: "devops" },
  { name: "Azure DevOps", level: 80, category: "devops" },
  { name: "SonarQube", level: 70, category: "devops" },
  { name: "Nexus", level: 70, category: "devops" },
  { name: "GitHub", level: 90, category: "devops" },
// AI
  { name: "AI Concepts", level: 70, category: "ai" },
  { name: "Data Analysis", level: 75, category: "ai" },
  { name: "Machine Learning (basics)", level: 65, category: "ai" },

  // testing
  { name: "SonarQube", level: 70, category: "testing" },
  { name: "junit", level: 75, category: "testing" },
  { name: "selenium", level: 65, category: "testing" },
  { name: "mockito", level: 65, category: "testing" },
   { name: "jest", level: 65, category: "testing" },

  //database
  { name: "MongoDB", level: 70, category: "database" },
  { name: "PostgreSQL", level: 65, category: "database" },
  { name: "MySQL", level: 85, category: "database" },
  { name: "SQLServer", level: 35, category: "database" },
  { name: "OracleDB", level: 40, category: "database" },
//cloud 
 { name: "DigitalOcean", level: 70, category: "cloud" },
  { name: "AWS", level: 65, category: "cloud" },
  { name: "Azure", level: 75, category: "cloud" },
   { name: "Oracle", level: 75, category: "cloud" },

  // Tools
  
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "UML", level: 80, category: "tools" },
  { name: "IntelliJ IDEA", level: 80, category: "tools" },
  { name: "Postman", level: 80, category: "tools" },
  { name: "Dbeaver", level: 80, category: "tools" },
  
];

const categories = ["all", "frontend", "backend", "devops","testing","database","cloud","tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};