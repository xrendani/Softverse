
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import githubService, { 
  GitHubAuthState,
  Repository,
  Issue,
  PullRequest
} from '@/services/github-service';

export function useGitHub() {
  const [authState, setAuthState] = useState<GitHubAuthState>(
    githubService.getAuthState()
  );

  // Authentication
  const authenticateWithGitHub = () => {
    const newAuthState = githubService.initiateOAuth();
    setAuthState(newAuthState);
    return newAuthState;
  };

  const signOut = () => {
    githubService.signOut();
    setAuthState(githubService.getAuthState());
  };

  // Repositories query
  const { 
    data: repositories,
    isLoading: isLoadingRepositories,
    error: repositoriesError,
    refetch: refetchRepositories 
  } = useQuery({
    queryKey: ['github', 'repositories', authState.isAuthenticated],
    queryFn: () => githubService.getUserRepositories(),
    enabled: authState.isAuthenticated,
  });

  // Trending repositories query
  const fetchTrendingRepos = (language?: string, since: 'daily' | 'weekly' | 'monthly' = 'weekly', limit: number = 10) => {
    return useQuery({
      queryKey: ['github', 'trending', language, since, limit],
      queryFn: () => githubService.getTrendingRepositories(language, since, limit),
    });
  };

  // Issues query factory
  const fetchIssues = (owner: string, repo: string) => {
    return useQuery({
      queryKey: ['github', 'issues', owner, repo],
      queryFn: () => githubService.getRepositoryIssues(owner, repo),
      enabled: authState.isAuthenticated && !!owner && !!repo,
    });
  };

  // Pull requests query factory
  const fetchPullRequests = (owner: string, repo: string) => {
    return useQuery({
      queryKey: ['github', 'pullRequests', owner, repo],
      queryFn: () => githubService.getRepositoryPullRequests(owner, repo),
      enabled: authState.isAuthenticated && !!owner && !!repo,
    });
  };

  return {
    // Auth state and methods
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    authenticateWithGitHub,
    signOut,

    // Repositories
    repositories,
    isLoadingRepositories,
    repositoriesError,
    refetchRepositories,

    // Query factories
    fetchTrendingRepos,
    fetchIssues,
    fetchPullRequests,
  };
}
