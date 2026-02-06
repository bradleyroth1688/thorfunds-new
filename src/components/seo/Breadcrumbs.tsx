"use client";

import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/schema";
import SchemaScript from "./SchemaScript";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", url: "/" }, ...items];
  const schema = getBreadcrumbSchema(allItems);

  return (
    <>
      <SchemaScript schema={schema} />
      <nav 
        aria-label="Breadcrumb" 
        className={`text-sm ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-2">
          {allItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <svg 
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
              {index === allItems.length - 1 ? (
                <span 
                  className="text-gray-600 dark:text-gray-400 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="text-gold-600 hover:text-gold-700 dark:text-gold-500 dark:hover:text-gold-400 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
