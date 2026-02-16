import React from "react";
import { BookOpen, Briefcase, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MOCK_BOOKS } from "@/lib/constants";
import Image from "next/image";

const BestSellers = () => {
  return (
    <div className="space-y-8">
      {/* Featured Books */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl">Best Sellers</h2>
            <div className="h-2 w-20 bg-brutal-yellow mt-1 rounded-sm" />
          </div>
          <a
            href="/ebooks"
            className="font-bold underline hover:text-brutal-purple transition-colors"
          >
            View Store
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_BOOKS.slice(0, 2).map((book) => (
            <Card key={book.id} noPadding hoverEffect className="group flex flex-col h-full">
              <div className={`relative h-48 ${book.coverColor} border-b-3 border-border overflow-hidden`}>
                {book.imageLink ? (
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    placeholder="blur"
                    blurDataURL={book.imageLink}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={48} className="text-white opacity-50" />
                  </div>
                )}
                <span className="absolute top-3 right-3 bg-card border-2 border-border px-2 py-1 text-xs font-bold shadow-sm z-10">
                  {book.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col grow">
                <h3 className="font-bold text-xl mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  By {book.author}
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <div>
                    <span className="text-muted-foreground line-through text-sm">
                      ₹{book.originalPrice}
                    </span>
                    <span className="text-2xl font-black ml-2">
                      ₹{book.price}
                    </span>
                  </div>
                  <button className="btn-brutal btn-brutal-sm">Buy Now</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Job & Career Highlights */}
      <div
        className="bg-card border-3 border-border p-4 sm:p-8 rounded-xl"
        style={{ boxShadow: "5px 5px 0px 0px var(--brutal-black)" }}
      >
        <h2 className="font-bold text-2xl sm:text-3xl mb-4 sm:mb-6 flex items-center gap-3">
          <Briefcase className="text-brutal-purple" />
          Job &amp; Career Highlights
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-muted border-2 border-border hover:bg-nb-lime transition-colors cursor-pointer rounded-lg"
            >
              <div className="bg-brutal-dark text-white px-3 py-1 font-bold text-sm whitespace-nowrap rounded-md">
                NOV {i + 10}
              </div>
              <div className="grow">
                <h4 className="font-bold text-lg">
                  WB Civil Service Application Opens
                </h4>
                <p className="text-sm text-muted-foreground">
                  Last date to apply is Dec 15th. Check eligibility.
                </p>
              </div>
              <ArrowRight size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
