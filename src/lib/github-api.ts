
/**
 * GitHub API Client for Softverse
 * Provides access to GitHub repositories, trending projects, and user data
 */

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
};

/**
 * Fetch trending repositories from GitHub
 * @param language Optional programming language filter
 * @param since Time period (daily, weekly, monthly)
 * @param limit Number of repositories to return
 */
export async function fetchTrendingRepos(
  language?: string,
  since: 'daily' | 'weekly' | 'monthly' = 'weekly',
  limit: number = 10
): Promise<GithubRepo[]> {
  // In a real implementation, GitHub API doesn't have a direct trending endpoint
  // You would typically use a third-party service or GitHub's search API with sorting
  
  // For demo purposes, we'll fetch popular repos based on stars
  const languageParam = language ? `+language:${language}` : '';
  const url = `https://api.github.com/search/repositories?q=stars:>1000${languageParam}&sort=stars&order=desc&per_page=${limit}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add Authorization header with token when user provides a GitHub API key
        // 'Authorization': `token ${process.env.GITHUB_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching trending repositories:', error);
    return [];
  }
}

/**
 * Fetch popular developer libraries and tools
 * @param category Category of tools to fetch
 * @param limit Number of libraries to return
 */
export async function fetchPopularDevLibs(
  category?: 'frontend' | 'backend' | 'devtools' | 'testing',
  limit: number = 10
): Promise<GithubRepo[]> {
  // Maps categories to search queries for popular dev libraries
  const categoryQueries: Record<string, string> = {
    'frontend': 'topic:frontend stars:>5000',
    'backend': 'topic:backend stars:>5000',
    'devtools': 'topic:developer-tools stars:>5000',
    'testing': 'topic:testing stars:>3000',
    'default': 'topic:javascript-library OR topic:development-tools stars:>10000'
  };
  
  const searchQuery = category ? categoryQueries[category] : categoryQueries.default;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc&per_page=${limit}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching popular libraries:', error);
    return [];
  }
}

/**
 * Convert GitHub repository to ResourceCard props
 * @param repo GitHub repository data
 * @param color Background color for the icon
 * @param icon Icon component to use
 */
export function repoToResourceCard(repo: GithubRepo, color: string, IconComponent: any) {
  return {
    title: repo.name,
    description: repo.description || `A popular ${repo.language || ''} repository`,
    icon: IconComponent,
    color: color,
    tags: repo.topics.slice(0, 3) || [repo.language || 'Repository'],
    url: repo.html_url,
    stars: repo.stargazers_count,
    githubUrl: repo.html_url
  };
}

/**
 * Authorization functions for GitHub OAuth
 */

export function initiateGithubLogin() {
  // In production, this would redirect to GitHub OAuth
  // For demo purposes, we'll just log the action
  console.log('Initiating GitHub login flow');
  // Example of a real implementation:
  // const clientId = 'your-github-client-id';
  // const redirectUri = encodeURIComponent('http://localhost:8080/auth/github/callback');
  // const scope = 'user:email,repo';
  // window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  
  // Simulating a successful login for demo purpose
  return {
    success: true,
    username: 'demo_user',
    avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
  };
}

/**
 * Publish code to GitHub repository
 * @param repoName Repository name
 * @param files Files to commit
 * @param message Commit message
 */
export async function publishToGithub(repoName: string, files: any[], message: string) {
  // This is a placeholder function to demonstrate the concept
  // In a real implementation, you would use GitHub API to create/update repositories
  
  console.log(`Publishing to GitHub repository: ${repoName}`);
  console.log('Files:', files);
  console.log('Commit message:', message);
  
  // Simulating a successful publish for demo purpose
  return {
    success: true,
    repoUrl: `https://github.com/demo_user/${repoName}`
  };
}
