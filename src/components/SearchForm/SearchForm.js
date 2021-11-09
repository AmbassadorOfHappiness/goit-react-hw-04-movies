import { useState } from 'react';

import style from '../SearchForm/SearchForm.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const queryValue = e.currentTarget.value.toLowerCase().trim();
    setQuery(queryValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.searchForm}>
        <input
          className={style.inputForm}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={style.buttonForm}>
          <span>Search</span>
        </button>
      </form>
    </>
  );
}