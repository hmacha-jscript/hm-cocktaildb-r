import React from "react";

export default function SearchForm({ setSearchTerm }) {
  return (
    <section className="section">
      <h2 className="section-title">search cocktails</h2>
      <form className="form search-form">
        <input type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="Search Term"
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </form>
    </section>
  )
}
