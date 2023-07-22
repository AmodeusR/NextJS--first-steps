import getWikiResults from "@/lib/getWikiResults";
import React from "react";
import Item from "./components/Item";


type Props = {
  params: {
    searchTerm: string;
  };
};

const generateMetadata = async ({ params }: Props) => {
  const { searchTerm } = params;
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;
  const displayTerm = searchTerm.replaceAll("%20", " ");

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} not found`
    }
  }
  
  return {
    title: displayTerm,
    description: `Results for ${displayTerm}`
  }
}

export default async function SearchResults({ params }: Props) {
  const { searchTerm } = params;

  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;
  const results: Result[] | undefined = data?.query?.pages;
  return (
    <main className="bg-slate-200 mx-auto max-w-xl py-1 min-h-screen">
      { results ? Object.values(results).map( result => (
        <Item result={result} key={result.pageid} />
      )) : <p className="p-2 text-xl">Nothing was found</p>}
    </main>
  );
}
