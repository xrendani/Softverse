
import { GithubRepo } from '@/lib/github-api';

// GitHub API endpoints
const API_BASE_URL = 'https://api.github.com';

// GitHub authentication
export interface GitHubAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: GitHubUser | null;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  email: string | null;
  bio: string | null;
}

// Repository interfaces
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  html_url: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  assignees: {
    login: string;
    avatar_url: string;
  }[];
  labels: {
    name: string;
    color: string;
  }[];
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  html_url: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  requested_reviewers: {
    login: string;
    avatar_url: string;
  }[];
}

// Local storage keys
const GITHUB_AUTH_KEY = 'aio_dev_github_auth';

/**
 * GitHub API Service
 * Provides methods for interacting with GitHub API
 */
export class GitHubService {
  private authState: GitHubAuthState;

  constructor() {
    // Initialize auth state from local storage
    const savedAuth = localStorage.getItem(GITHUB_AUTH_KEY);
    this.authState = savedAuth 
      ? JSON.parse(savedAuth)
      : { isAuthenticated: false, accessToken: null, user: null };
  }

  /**
   * Initialize GitHub OAuth flow
   * In a production app, this would redirect to GitHub's OAuth page
   */
  initiateOAuth() {
    // For demo purposes, we'll simulate the OAuth flow
    console.log('Initiating GitHub OAuth flow...');
    
    // In a real implementation, this would redirect to GitHub's OAuth page:
    // const clientId = process.env.GITHUB_CLIENT_ID;
    // const redirectUri = encodeURIComponent(window.location.origin + '/auth/github/callback');
    // const scope = 'repo user';
    // window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    // For demo, we'll simulate a successful authentication
    const mockUser: GitHubUser = {
      login: 'demo_user',
      id: 12345,
      avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
      name: 'Demo User',
      email: 'demo@example.com',
      bio: 'This is a simulated GitHub user for demo purposes'
    };
    
    this.authState = {
      isAuthenticated: true,
      accessToken: 'mock_token_for_demo',
      user: mockUser
    };
    
    // Save to local storage
    localStorage.setItem(GITHUB_AUTH_KEY, JSON.stringify(this.authState));
    
    return this.authState;
  }

  /**
   * Get current authentication state
   */
  getAuthState(): GitHubAuthState {
    return this.authState;
  }

  /**
   * Check if user is authenticated with GitHub
   */
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  /**
   * Sign out from GitHub
   */
  signOut() {
    this.authState = { isAuthenticated: false, accessToken: null, user: null };
    localStorage.removeItem(GITHUB_AUTH_KEY);
  }

  /**
   * Fetch user repositories
   */
  async getUserRepositories(): Promise<Repository[]> {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated with GitHub');
    }

    // In a real implementation, this would make an actual API call:
    // const response = await fetch(`${API_BASE_URL}/user/repos`, {
    //   headers: {
    //     'Authorization': `token ${this.authState.accessToken}`
    //   }
    // });
    // return await response.json();

    // For demo, return mock repositories
    return [
      {
        id: 1,
        name: 'project-alpha',
        full_name: 'demo_user/project-alpha',
        description: 'A innovative web application for developers',
        html_url: 'https://github.com/demo_user/project-alpha',
        stargazers_count: 24,
        forks_count: 7,
        language: 'TypeScript',
        owner: {
          login: 'demo_user',
          avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4'
        },
        created_at: '2024-01-15T12:00:00Z',
        updated_at: '2025-04-01T15:30:00Z'
      },
      {
        id: 2,
        name: 'react-components',
        full_name: 'demo_user/react-components',
        description: 'Collection of reusable React components',
        html_url: 'https://github.com/demo_user/react-components',
        stargazers_count: 87,
        forks_count: 12,
        language: 'JavaScript',
        owner: {
          login: 'demo_user',
          avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4'
        },
        created_at: '2023-09-10T10:20:00Z',
        updated_at: '2025-03-28T09:15:00Z'
      },
      {
        id: 3,
        name: 'node-api-toolkit',
        full_name: 'demo_user/node-api-toolkit',
        description: 'Toolkit for building Node.js APIs quickly',
        html_url: 'https://github.com/demo_user/node-api-toolkit',
        stargazers_count: 45,
        forks_count: 8,
        language: 'TypeScript',
        owner: {
          login: 'demo_user',
          avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4'
        },
        created_at: '2024-02-05T14:30:00Z',
        updated_at: '2025-04-08T11:45:00Z'
      }
    ];
  }

  /**
   * Fetch issues from a repository
   */
  async getRepositoryIssues(owner: string, repo: string): Promise<Issue[]> {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated with GitHub');
    }

    // For demo, return mock issues
    return [
      {
        id: 101,
        number: 42,
        title: 'Fix memory leak in data processing worker',
        state: 'open',
        html_url: `https://github.com/${owner}/${repo}/issues/42`,
        created_at: '2025-03-15T09:30:00Z',
        updated_at: '2025-04-01T14:20:00Z',
        user: {
          login: 'collaborator1',
          avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
        },
        assignees: [
          {
            login: 'demo_user',
            avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4'
          }
        ],
        labels: [
          { name: 'bug', color: 'ff0000' },
          { name: 'priority: high', color: 'f29513' }
        ]
      },
      {
        id: 102,
        number: 43,
        title: 'Implement dark mode in dashboard',
        state: 'open',
        html_url: `https://github.com/${owner}/${repo}/issues/43`,
        created_at: '2025-03-20T11:15:00Z',
        updated_at: '2025-04-02T13:40:00Z',
        user: {
          login: 'demo_user',
          avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4'
        },
        assignees: [
          {
            login: 'collaborator2',
            avatar_url: 'https://avatars.githubusercontent.com/u/67890?v=4'
          }
        ],
        labels: [
          { name: 'enhancement', color: '0e8a16' },
          { name: 'ui', color: '5319e7' }
        ]
      }
    ];
  }

  /**
   * Fetch pull requests from a repository
   */
  async getRepositoryPullRequests(owner: string, repo: string): Promise<PullRequest[]> {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated with GitHub');
    }

    // For demo, return mock pull requests
    return [
      {
        id: 201,
        number: 12,
        title: 'Add authentication middleware',
        state: 'open',
        html_url: `https://github.com/${owner}/${repo}/pull/12`,
        created_at: '2025-03-25T10:45:00Z',
        updated_at: '2025-04-05T16:30:00Z',
        user: {
          login: 'collaborator3',
          avatar_url: 'https://avatars.githubusercontent.com/u/13579?v=4'
        },
        requested_reviewers: [
          {
            login: 'demo_user',
            avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4'
          }
        ]
      },
      {
        id: 202,
        number: 13,
        title: 'Optimize image loading with lazy loading',
        state: 'open',
        html_url: `https://github.com/${owner}/${repo}/pull/13`,
        created_at: '2025-04-01T14:20:00Z',
        updated_at: '2025-04-06T11:10:00Z',
        user: {
          login: 'demo_user',
          avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4'
        },
        requested_reviewers: [
          {
            login: 'collaborator1',
            avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4'
          }
        ]
      }
    ];
  }

  /**
   * Create a webhook for a repository
   */
  async createWebhook(owner: string, repo: string, webhookUrl: string): Promise<boolean> {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated with GitHub');
    }

    // For demo, just log and return success
    console.log(`Created webhook for ${owner}/${repo} to ${webhookUrl}`);
    return true;
  }

  /**
   * Get trending repositories (based on the GitHub API implementation)
   */
  async getTrendingRepositories(language?: string, since: 'daily' | 'weekly' | 'monthly' = 'weekly', limit: number = 10): Promise<Repository[]> {
    // Reuse the existing implementation from github-api.ts but convert to this service
    const languageParam = language ? `+language:${language}` : '';
    const url = `${API_BASE_URL}/search/repositories?q=stars:>1000${languageParam}&sort=stars&order=desc&per_page=${limit}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Add Authorization header with token when authenticated
          ...(this.isAuthenticated() && { 'Authorization': `token ${this.authState.accessToken}` })
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
}

// Create and export a singleton instance
const githubService = new GitHubService();
export default githubService;
