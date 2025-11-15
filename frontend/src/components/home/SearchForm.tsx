'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { layoutClasses } from '@/styles/layout';
import { cn } from '@/lib/utils';

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full max-w-full lg:max-w-lg">
      <form className={cn(layoutClasses.flex.center, "space-x-2")} onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder="Search doctors, specialties..."
          className="flex-1 bg-white border-gray-200 shadow-sm text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}