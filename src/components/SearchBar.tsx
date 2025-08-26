import React, { useState } from "react";
import { Text } from "./Text";
import { Button } from "./Button";
import styles from "../styles/SearchBar.module.css";

type Props = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") onSearch(query.trim());
    setQuery("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Text variant="p" className={styles.label}>Search City:</Text>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
        placeholder="Enter city name..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
