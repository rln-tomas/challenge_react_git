interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  type: string;
  html_url: string;
}
interface UseGithubUsersReturn {
  users: GitHubUser[];
  loading: boolean;
  loadingMore: boolean;
  isSearchMode: boolean;
  hasMoreResults: boolean;
  handleSearch: (query: string) => Promise<void>;
  loadMoreUsers: () => Promise<void>;
  resetSearch: () => void;
  reloadData: () => Promise<void>;
}

interface AppbarProps {
  showSearch: boolean;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  toggleSearch: () => void;
  title: string;
  showSearchAction?: boolean;
}

interface UserDetailData {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  blog: string;
  location: string;
  company: string;
  html_url: string;
  type?: string;
}

interface UserItemProps {
  user: GitHubUser;
  onPress: (user: GitHubUser) => void;
  isFavorite?: boolean;
}
interface SearchUsersAPIResult {
  items: GitHubUser[];
  total_count: number;
}
interface RenderLabelProps {
  route: { title?: string };
  focused: boolean;
  color: string;
}
interface RenderListProps {
  loading: boolean;
  refreshing: boolean;
  tab: "usuarios" | "favoritos";
  listData: GitHubUser[];
  emptyMessage: string;
  loadingMore: boolean;
  onRefresh: () => void;
  handleScrollEnd: (event: any) => void;
  onUserPress: (user: GitHubUser) => void;
  isFavoriteCallback: (id: number) => boolean;
}
export {
  AppbarProps,
  GitHubUser,
  RenderLabelProps,
  RenderListProps,
  SearchUsersAPIResult,
  UseGithubUsersReturn,
  UserDetailData,
  UserItemProps,
};
