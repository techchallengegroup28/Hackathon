"use client"
import ListPostUser from "@/components/ListPostUser";
import Bar from "@/components/bar";
import React, { useState } from 'react';

const ParentComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
	<div className="container">
      <main>
    <div>
      <Bar onSearch={handleSearch} />
      <ListPostUser searchQuery={searchQuery} />
    </div>
	  </main>
	</div>
  );
};

export default ParentComponent;
