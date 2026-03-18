"use client"

import { Navbar } from "@/components/Navbar";
import { PathCard } from "@/components/PathCard";
import { LEARNING_PATHS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

<<<<<<< HEAD
interface CategoryData {
  playlists: LearningResource[];
  articles?: { title: string; url: string }[];
}

const resources: LearningResource[] = [
  {
    id: 'roadmap',
    name: 'Roadmap.sh',
    url: 'https://roadmap.sh/',
    description: 'Interactive developer roadmaps, guides and educational content',
    icon: 'https://img.icons8.com/fluency/48/map.png',
    color: '#667eea',
    category: 'Career Planning',
  },
  {
    id: 'dsa-tutorials',
    name: 'Data Structures & Algorithms',
    url: '/youtube-tutorials#dsa',
    description: 'Master DSA with curated high-quality video playlists covering fundamentals to advanced topics',
    icon: 'https://img.icons8.com/fluency/48/tree-structure.png',
    color: '#FF0000',
    category: 'YouTube Tutorials',
  },
  {
    id: 'dbms-tutorials',
    name: 'Database Management',
    url: '/youtube-tutorials#dbms',
    description: 'Comprehensive guides on SQL, NoSQL, and database architecture',
    icon: 'https://img.icons8.com/fluency/48/database.png',
    color: '#FF0000',
    category: 'YouTube Tutorials',
  },
  {
    id: 'ml-tutorials',
    name: 'Machine Learning',
    url: '/youtube-tutorials#ml',
    description: 'Learn ML foundations, deep learning, and practical applications',
    icon: 'https://img.icons8.com/fluency/48/robot.png',
    color: '#FF0000',
    category: 'YouTube Tutorials',
  },
  {
    id: 'os-tutorials',
    name: 'Operating Systems',
    url: '/youtube-tutorials#os',
    description: 'Understanding memory management, processes, and kernel architecture',
    icon: 'https://img.icons8.com/fluency/48/monitor.png',
    color: '#FF0000',
    category: 'YouTube Tutorials',
  },
  {
    id: 'python-tutorials',
    name: 'Python',
    url: '/youtube-tutorials#python',
    description: 'From syntax basics to advanced scripting and automation with Python',
    icon: 'https://img.icons8.com/fluency/48/python.png',
    color: '#FF0000',
    category: 'YouTube Tutorials',
  },
  {
    id: 'system-design-tutorials',
    name: 'System Design',
    url: '/youtube-tutorials#system-design',
    description: 'Build scalable systems with in-depth high-level and low-level design tutorials',
    icon: 'https://img.icons8.com/fluency/48/crane.png',
    color: '#FF0000',
    category: 'YouTube Tutorials',
  },
  {
    id: 'webdev-tutorials',
    name: 'Web Development',
    url: '/youtube-tutorials#webdev',
    description: 'Complete roadmaps and tutorials for modern frontend and backend stacks',
    icon: 'https://img.icons8.com/fluency/48/globe.png',
    color: '#FF0000',
    category: 'Video Courses',
  },
  {
    id: 'w3schools',
    name: 'W3Schools',
    url: 'https://www.w3schools.com/',
    description: 'Web development tutorials, references, and exercises',
    icon: 'https://img.icons8.com/fluency/48/books.png',
    color: '#04AA6D',
    category: 'Tutorials',
  },
  {
    id: 'webdev',
    name: 'Web.dev Learn',
    url: 'https://web.dev/learn',
    description: "Google's comprehensive web development courses and best practices",
    icon: 'https://img.icons8.com/fluency/48/graduation-cap.png',
    color: '#4facfe',
    category: 'Web Development',
  },
  {
    id: 'dotnet',
    name: 'Microsoft Learn - .NET',
    url: 'https://learn.microsoft.com/en-us/training/paths/build-dotnet-applications-csharp/?ns-enrollment-type=Collection&ns-enrollment-id=2md8ip7z51wd47',
    description: 'Build modern .NET applications with C# - Complete learning path',
    icon: 'https://img.icons8.com/fluency/48/monitor.png',
    color: '#512BD4',
    category: 'Backend Development',
  },
  {
    id: 'mslearn',
    name: 'Microsoft Learn - Browse',
    url: 'https://learn.microsoft.com/en-us/training/browse/?resource_type=learning%20path',
    description: 'Explore thousands of Microsoft learning paths and modules',
    icon: 'https://img.icons8.com/fluency/48/search.png',
    color: '#0078D4',
    category: 'Learning Paths',
  },
  {
    id: 'dsa-algorithm-visualizer',
    name: 'DSA Algorithm Visualizer',
    url: 'https://visualgo.net/en',
    description: 'Interactive visualizations for data structures and algorithms to help you understand complex concepts visually.',
    icon: 'https://img.icons8.com/fluency/48/bar-chart.png',
    color: '#0ea5e9',
    category: 'Visualizer',
  },
  {
    id: 'unity',
    name: 'Unity Learn',
    url: 'https://unity.com/learn',
    description: 'Master real-time 3D development with Unity tutorials and courses',
    icon: 'https://img.icons8.com/fluency/48/controller.png',
    color: '#6366f1',
    category: 'Game Development',
  },
  {
    id: 'unreal',
    name: 'Unreal Engine',
    url: 'https://www.unrealengine.com/en-US/learn',
    description: 'Learn to create stunning 3D experiences with Unreal Engine',
    icon: 'https://img.icons8.com/fluency/48/controller.png',
    color: '#6366f1',
    category: 'Game Development',
  },
  {
    id: 'github-visualizer',
    name: 'GitHub Visualizer',
    url: 'https://github-visualizer-olive.vercel.app',
    description: 'Beautifully visualize your GitHub contributions and activity',
    icon: 'https://img.icons8.com/fluency/48/bar-chart.png',
    color: '#24292e',
    category: 'Visualization',
  },
  {
    id: 'cyfrin-updraft',
    name: 'Cyfrin Updraft',
    url: 'https://updraft.cyfrin.io/',
    description: 'Learn blockchain and Web3 development with comprehensive courses on Solidity, smart contracts, and decentralized applications',
    icon: 'https://img.icons8.com/fluency/48/blockchain.png',
    color: '#8B5CF6',
    category: 'Blockchain & Web3',
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    url: 'https://leetcode.com/',
    description: 'The world\'s most popular coding platform for technical interviews and algorithmic challenges.',
    icon: 'https://img.icons8.com/fluency/48/brain.png',
    color: '#FFA116',
    category: 'Competitive Programming',
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    url: 'https://codeforces.com/',
    description: 'Participate in short programming contests and solve problems from a vast archive.',
    icon: 'https://img.icons8.com/fluency/48/winner.png',
    color: '#1F8ACB',
    category: 'Competitive Programming',
  },
  {
    id: 'geeksforgeeks',
    name: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/',
    description: 'A comprehensive computer science portal with tutorials, courses, and coding problems.',
    icon: 'https://img.icons8.com/fluency/48/console.png',
    color: '#2F8D46',
    category: 'Competitive Programming',
  },
];

const navigationLinks = [
  { name: 'All Categories', url: '/', icon: '📁' },
  { name: 'YouTube Tutorials', url: '/youtube-tutorials', icon: 'https://img.icons8.com/fluency/48/play-button-circled.png' },
  { name: 'Game Development', url: '/game-development', icon: 'https://img.icons8.com/fluency/48/controller.png' },
  { name: 'Contribute', url: '/contributors', icon: 'https://img.icons8.com/fluency/48/handshake.png' },
  { name: 'Open Source', url: 'https://github.com/Tanay2920003/Learning-hub', icon: 'https://img.icons8.com/fluency/48/github.png' },
];

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [dynamicCategories, setDynamicCategories] = useState<TopicData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCategories();
      setDynamicCategories(data);
    }
    fetchData();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (resource: LearningResource) => {
    const element = document.getElementById(resource.id.startsWith('http') ? '' : resource.category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (resource.url) {
      window.open(resource.url, resource.url.startsWith('/') ? '_self' : '_blank');
    } else if (resource.urls && resource.urls.length > 0) {
      window.open(resource.urls[0].url, '_blank');
    }
    setSearchQuery(resource.name);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  };

  // Combined resources: static + dynamic
  const allResources = useMemo(() => {
    const dynamicResources: LearningResource[] = [];
    dynamicCategories.forEach(cat => {
      cat.playlists.forEach((pl, idx) => {
        dynamicResources.push({
          id: `${cat.slug}-${idx}-${pl.url}`,
          name: pl.title,
          url: pl.url,
          description: pl.description,
          icon: 'https://img.icons8.com/fluency/48/video.png',
          color: '#FF0000',
          category: cat.name
        });
      });
    });
    return [...resources, ...dynamicResources];
  }, [dynamicCategories]);

  // Filter resources based on search query
  const filteredResources = useMemo(() => allResources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery, allResources]);

  const categories = useMemo(() => {
    const categoryNames = dynamicCategories.map(c => c.name);
    if (searchQuery.length > 0) {
      // logic to filter based on search
      // For now, just return all or filter names
      return categoryNames.filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return categoryNames;
  }, [dynamicCategories, searchQuery]);

  // Group resources by category
  const groupedResources = useMemo(() => {
    const grouped: Record<string, CategoryData> = {};

    // Add dynamic categories
    dynamicCategories.forEach(cat => {
      grouped[cat.name] = {
        playlists: cat.playlists.map((pl, idx) => ({
          id: `${cat.slug}-${idx}-${pl.url}`,
          name: pl.title,
          url: pl.url,
          description: pl.description,
          icon: 'https://img.icons8.com/fluency/48/video.png',
          color: '#FF0000',
          category: cat.name
        })),
        articles: cat.articles || []
      };
    });

    // Add static resources (optional, if we want to keep them)
    resources.forEach(res => {
      if (!grouped[res.category]) {
        grouped[res.category] = { playlists: [], articles: [] };
      }
      grouped[res.category].playlists.push(res);
    });

    return grouped;
  }, [dynamicCategories]);

  // Helper to get an icon for the category
  const getCategoryIcon = (categoryName: string) => {
    const cat = dynamicCategories.find(c => c.name === categoryName);
    return cat ? cat.icon : '📁';
  };

  const renderIcon = (icon: string) => {
    if (icon.startsWith('http')) {
      return (
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          style={{ objectFit: 'contain' }}
          unoptimized={icon.startsWith('http')}
        />
      );
    }
    return icon;
  };

  // Refs for horizontal scroll containers
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[category];
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
=======
  const filteredLearningPaths = LEARNING_PATHS.filter((path) =>
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
>>>>>>> pr-34

  return (
    <div className="min-h-screen bg-background selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 pt-16 md:pt-24 pb-24">

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 mt-10">

          <div className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            Premium Resources Directory
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.15] sm:leading-[1.1]">
            Master Your Craft with <br className="hidden sm:block" />
            <span className="text-slate-200">
              Curated Roadmaps.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 max-w-2xl font-light px-2">
            Choose your path, follow our guided sequences, and build real-world projects. High-quality learning resources, completely open-source.
          </p>

          <div className="relative w-full max-w-md px-4 sm:px-0">
            <Search className="absolute left-7 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search for various paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 bg-zinc-900/50 border-zinc-800 text-slate-200 placeholder:text-slate-500 h-12 rounded-full focus-visible:ring-zinc-700 focus-visible:border-zinc-700 transition-all w-full"
            />
          </div>

        </div>

<<<<<<< HEAD
        <div className={styles.cardsGrid} id="Categories">
          {categories.length > 0 ? (
            categories.map((category) => (
              <section key={category} id={category} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryIcon}>{renderIcon(getCategoryIcon(category))}</span>
                    <h2 className={styles.categoryTitle}>{category}</h2>
                  </div>
                  <div className={styles.scrollButtons}>
                    <button
                      className={styles.scrollButton}
                      onClick={() => scroll(category, 'left')}
                      aria-label="Scroll left"
                    >
                      ‹
                    </button>
                    <button
                      className={styles.scrollButton}
                      onClick={() => scroll(category, 'right')}
                      aria-label="Scroll right"
                    >
                      ›
                    </button>
                  </div>
                </div>
                <div
                  className={styles.grid}
                  ref={el => { scrollRefs.current[category] = el; }}
                >
                  {groupedResources[category]?.playlists.length > 0 ? (
                    groupedResources[category].playlists.map((resource) => {
                      const hasMultipleUrls = resource.urls && resource.urls.length > 0;
                      const singleUrl = resource.url || '';
                      const isInternal = singleUrl.startsWith('/');

                      const CardWrapper = hasMultipleUrls ? 'div' : 'a';
                      const cardProps = hasMultipleUrls
                        ? {}
                        : {
                          href: singleUrl,
                          target: isInternal ? '_self' : '_blank',
                          rel: isInternal ? undefined : 'noopener noreferrer',
                        };

                      return (
                        <CardWrapper
                          key={resource.id}
                          className={`${styles.card} ${resource.category === 'Video Courses' ? styles.videoCard : ''}`}
                          {...cardProps}
                        >
                          <div className={styles.cardHeader}>
                            <span
                              className={styles.difficultyBadge}
                              style={{
                                borderColor: resource.color,
                                color: '#e4e4e7',
                                background: `${resource.color}25`,
                              }}
                            >
                              {resource.category}
                            </span>
                            <span
                              className={styles.languageBadge}
                              style={{ fontSize: '1.2rem', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              {renderIcon(resource.icon)}
                            </span>
                          </div>
                          <h3 className={styles.cardTitle}>{resource.name}</h3>
                          <p className={styles.cardDescription}>{resource.description}</p>
                          <div className={styles.cardFooter}>
                            <div className={styles.stats}></div>
                            {hasMultipleUrls ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                                {resource.urls!.map((urlItem) => {
                                  const platformColors: Record<string, string> = {
                                    'LeetCode': '#FFA116',
                                    'Codeforces': '#1F8ACB',
                                    'GeeksforGeeks': '#2F8D46',
                                  };
                                  const buttonColor = platformColors[urlItem.label] || resource.color;
                                  return (
                                    <a
                                      key={urlItem.url}
                                      href={urlItem.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={styles.watchButton}
                                      style={{
                                        backgroundColor: buttonColor,
                                        boxShadow: `0 6px 20px ${buttonColor}50`,
                                        width: '100%',
                                        justifyContent: 'center',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '0.95rem',
                                        fontWeight: 700,
                                      }}
                                    >
                                      {urlItem.label}
                                    </a>
                                  );
                                })}
                              </div>
                            ) : (
                              <span
                                className={styles.watchButton}
                                style={{
                                  backgroundColor: resource.color,
                                  boxShadow: `0 4px 12px ${resource.color}40`,
                                }}
                              >
                                Open Resource
                              </span>
                            )}
                          </div>
                        </CardWrapper>
                      );
                    })
                  ) : (
                    <div className={`${styles.card} ${styles.contributeCard}`}>
                      <div className={styles.cardHeader}>
                        <span className={styles.difficultyBadge} style={{ borderColor: '#6366f1', color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)' }}>
                          CONTRIBUTE
                        </span>
                        <span className={styles.languageBadge} style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Image src="https://img.icons8.com/fluency/48/handshake.png" alt="" width={24} height={24} unoptimized />
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>Add Resources</h3>
                      <p className={styles.cardDescription}>
                        This category is looking for high-quality resources. Help the community by contributing your favorites!
                      </p>
                      <div className={styles.cardFooter}>
                        <div className={styles.stats}></div>
                        <a
                          href="https://github.com/Tanay2920003/Learning-hub"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.watchButton}
                          style={{
                            backgroundColor: '#6366f1',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                            width: '100%',
                            justifyContent: 'center'
                          }}
                        >
                          Add on GitHub
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Articles Card */}
                {groupedResources[category]?.articles && groupedResources[category].articles!.length > 0 && (
                  <div className={styles.articlesSection}>
                    <h3 className={styles.articlesTitle}>📚 Articles & Notes to Read</h3>
                    <div className={styles.articlesGrid}>
                      {groupedResources[category].articles!.map((article, idx) => (
                        <a
                          key={idx}
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.articleCard}
                        >
                          <span className={styles.articleIcon}>📄</span>
                          <span className={styles.articleTitle}>{article.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No resources found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>
=======
        {filteredLearningPaths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredLearningPaths.map((path) => (
              <PathCard key={path.slug} {...path} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Search className="h-10 w-10 text-slate-700 mb-4" />
            <p className="text-lg">No path found for "{searchQuery}"</p>
          </div>
        )}

>>>>>>> pr-34
      </main>
    </div>
  );
}