import { AppbarProps } from "@/interfaces";
import React from "react";
import { Appbar as PaperAppbar, Searchbar } from "react-native-paper";

const Appbar = ({
  showSearch,
  searchQuery,
  onChangeSearch,
  toggleSearch,
  title,
  showSearchAction = true,
}: AppbarProps) => {
  const displayTitle = typeof title === "string" ? title : "";

  return (
    <PaperAppbar.Header>
      {!showSearch ? (
        <>
          <PaperAppbar.Content title={displayTitle} />
          {showSearchAction && (
            <PaperAppbar.Action icon="magnify" onPress={toggleSearch} />
          )}
        </>
      ) : (
        <>
          <PaperAppbar.Action icon="arrow-left" onPress={toggleSearch} />
          <Searchbar
            placeholder="Buscar usuarios"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{ flex: 1, marginRight: 10 }}
            autoFocus
          />
        </>
      )}
    </PaperAppbar.Header>
  );
};

export default Appbar;
