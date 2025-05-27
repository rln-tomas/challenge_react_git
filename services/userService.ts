import {
  GitHubUser,
  SearchUsersAPIResult,
  UserDetailData,
} from "../interfaces";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchUserDetailAPI = async (
  username: string
): Promise<UserDetailData | null> => {
  if (!username) {
    console.log("Username is undefined or empty.");
    return null;
  }
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`);
    if (!response.ok) {
      console.error(`Error fetching user ${username}: ${response.status}`);
      return null;
    }
    const data: UserDetailData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const fetchUsersAPI = async (
  since: number = 0,
  perPage: number = 25
): Promise<GitHubUser[]> => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/users?per_page=${perPage}&since=${since}`
    );

    if (!response.ok) {
      console.error(
        `Error fetching users: ${response.status} - ${response.statusText}`
      );

      return [];
    }

    const data: GitHubUser[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching GitHub users (catch block):", error);
    return [];
  }
};

export const searchUsersAPI = async (
  query: string,
  page: number = 1,
  perPage: number = 30
): Promise<SearchUsersAPIResult> => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/search/users?q=${encodeURIComponent(
        query
      )}&per_page=${perPage}&page=${page}`
    );
    if (!response.ok) {
      console.error(`Error searching users: ${response.status}`);
      return { items: [], total_count: 0 };
    }
    const data: SearchUsersAPIResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching GitHub users:", error);
    return { items: [], total_count: 0 };
  }
};
