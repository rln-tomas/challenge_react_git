import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flex: 1 },
  tabBar: {},
  scrollView: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadMoreContainer: { padding: 20, alignItems: "center" },
  searchBar: { flex: 1, marginRight: 10 },
  noResultsContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsText: { textAlign: "center", opacity: 0.6 },
});
