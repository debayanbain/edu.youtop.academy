"use client";

import React, { useRef } from "react";
import { BookOpen, Briefcase, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useRazorpay } from "@/hooks/useRazorpay";
import { Book } from "@/lib/types";
import { BestSellersSectionDto, JobHighlightsSectionDto, ProductCardDto, JobCardDto } from "@/lib/homepage-types";

interface BestSellersProps {
  data?: BestSellersSectionDto;
  jobData?: JobHighlightsSectionDto;
}

const BestSellers = ({ data, jobData }: BestSellersProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const { openCheckout } = useRazorpay();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftState = useRef(0);
  const dragDistance = useRef(0);

  // Map products returned from Strapi
  const rawProducts = data?.products || [];
  const mappedProducts = rawProducts.map((prod: ProductCardDto, idx: number): Book => {
    const colors = ["bg-brutal-purple", "bg-brutal-blue", "bg-brutal-yellow", "bg-brutal-green"];
    const coverColor = colors[idx % colors.length];
    const numPrice = typeof prod.price === 'string' ? parseInt(prod.price, 10) : prod.price;
    const numOldPrice = prod.old_price ? (typeof prod.old_price === 'string' ? parseInt(prod.old_price, 10) : prod.old_price) : undefined;
    
    return {
      id: typeof prod.id === 'string' ? parseInt(prod.id, 10) : prod.id,
      title: prod.title,
      author: prod.author_name || "YouTOP Academy",
      price: numPrice,
      originalPrice: numOldPrice || Math.round(numPrice * 1.5),
      tag: prod.badge || "Best Seller",
      coverColor: coverColor,
      imageLink: prod.thumbnail?.url || undefined,
      class: prod.class || "10",
      subject: prod.subject || "General",
      description: prod.short_description || "",
    };
  });

  const booksToDisplay = mappedProducts;
  const isSliderActive = booksToDisplay.length > 3;

  // Create a tripled array for seamless infinite looping (only if slider is active)
  const tripledBooks = isSliderActive 
    ? [
        ...booksToDisplay.map((b) => ({ ...b, uniqueId: `${b.id}-clone-0` })),
        ...booksToDisplay.map((b) => ({ ...b, uniqueId: `${b.id}-clone-1` })),
        ...booksToDisplay.map((b) => ({ ...b, uniqueId: `${b.id}-clone-2` })),
      ]
    : [];

  const jobsToDisplay = jobData?.jobs && jobData.jobs.length > 0
    ? jobData.jobs.map((job: JobCardDto) => ({
        id: job.id,
        title: job.title,
        description: job.short_description || "",
        badgeDate: job.badge_date || "NOV 12",
        link: job.link || "#",
      }))
    : [
        {
          id: 1,
          title: "WB Civil Service Application Opens",
          description: "Last date to apply is Dec 15th. Check eligibility.",
          badgeDate: "NOV 12",
          link: "#",
        },
        {
          id: 2,
          title: "WB Civil Service Application Opens",
          description: "Last date to apply is Dec 15th. Check eligibility.",
          badgeDate: "NOV 13",
          link: "#",
        },
        {
          id: 3,
          title: "WB Civil Service Application Opens",
          description: "Last date to apply is Dec 15th. Check eligibility.",
          badgeDate: "NOV 14",
          link: "#",
        },
      ];

  const handleBuyNow = (book: Book) => {
    if (dragDistance.current > 10) {
      // It was a drag gesture, prevent action
      return;
    }

    if (!userId) {
      router.push("/sign-up");
      return;
    }

    openCheckout({
      amount: book.price,
      productType: "ebook",
      productId: book.id.toString(),
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Payment failed:", message);
      }
    });
  };

  const getScrollAmount = () => {
    if (sliderRef.current && sliderRef.current.firstElementChild) {
      const firstChild = sliderRef.current.firstElementChild as HTMLElement;
      return firstChild.getBoundingClientRect().width + 24; // 24 is gap-6
    }
    return 340 + 24;
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  // Center the scroll position to Set 2 (middle set) on mount/data change
  React.useEffect(() => {
    if (!isSliderActive) return;
    const timer = setTimeout(() => {
      if (sliderRef.current) {
        const { scrollWidth } = sliderRef.current;
        sliderRef.current.scrollLeft = scrollWidth / 3;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [booksToDisplay.length, isSliderActive]);

  // Infinite looping boundary wrapper
  const handleScroll = () => {
    if (!isSliderActive || !sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const setWidth = scrollWidth / 3;
    if (setWidth === 0) return;

    if (scrollLeft >= scrollWidth - clientWidth - 10) {
      sliderRef.current.scrollLeft = scrollLeft - setWidth;
      if (isDragging.current) {
        scrollLeftState.current -= setWidth;
      }
    } else if (scrollLeft <= 10) {
      sliderRef.current.scrollLeft = scrollLeft + setWidth;
      if (isDragging.current) {
        scrollLeftState.current += setWidth;
      }
    }
  };

  // Autoplay Effect (right-to-left cards motion)
  React.useEffect(() => {
    if (!isSliderActive || isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: getScrollAmount(),
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isSliderActive]);

  // Drag-to-Scroll Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isSliderActive || !sliderRef.current) return;
    isDragging.current = true;
    dragDistance.current = 0;
    sliderRef.current.classList.add("cursor-grabbing");
    sliderRef.current.classList.remove("cursor-grab");
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftState.current = sliderRef.current.scrollLeft;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliderActive || !isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    dragDistance.current = Math.abs(x - startX.current);
    sliderRef.current.scrollLeft = scrollLeftState.current - walk;
  };

  const handleMouseUp = () => {
    if (!isSliderActive || !isDragging.current) return;
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.classList.remove("cursor-grabbing");
      sliderRef.current.classList.add("cursor-grab");
    }
    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (!isSliderActive) return;
    if (isDragging.current) {
      isDragging.current = false;
      if (sliderRef.current) {
        sliderRef.current.classList.remove("cursor-grabbing");
        sliderRef.current.classList.add("cursor-grab");
      }
    }
    setIsPaused(false);
  };

  // Hide the section completely if there are no dynamic books to display
  if (booksToDisplay.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Featured Books */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl">{data?.title || "Best Sellers"}</h2>
            <div className="h-2 w-20 bg-brutal-yellow mt-1 rounded-sm" />
          </div>
          <div className="flex items-center gap-4">
            {/* Slider Navigation Arrows */}
            {isSliderActive && (
              <div className="flex gap-2">
                <button 
                  onClick={slideLeft}
                  className="w-10 h-10 border-2 border-border bg-white flex items-center justify-center hover:bg-brutal-yellow hover:-translate-y-0.5 active:translate-y-0 shadow-[2px_2px_0px_0px_var(--brutal-black)] active:shadow-none transition-all rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={slideRight}
                  className="w-10 h-10 border-2 border-border bg-white flex items-center justify-center hover:bg-brutal-yellow hover:-translate-y-0.5 active:translate-y-0 shadow-[2px_2px_0px_0px_var(--brutal-black)] active:shadow-none transition-all rounded-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
            <a
              href="/ebooks"
              className="font-bold underline hover:text-brutal-purple transition-colors ml-2"
            >
              View Store
            </a>
          </div>
        </div>

        <div className="relative">
          {/* Custom style to hide Webkit scrollbars */}
          <style dangerouslySetInnerHTML={{ __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}} />
          
          <div 
            ref={sliderRef}
            onMouseEnter={() => { if (isSliderActive) setIsPaused(true); }}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onScroll={handleScroll}
            className={`no-scrollbar flex gap-6 overflow-x-auto pt-4 pb-6 px-1 ${
              isSliderActive ? "cursor-grab select-none active:cursor-grabbing" : ""
            }`}
          >
            {(isSliderActive ? tripledBooks : booksToDisplay).map((book) => (
              <div 
                key={isSliderActive ? (book as Book & { uniqueId: string }).uniqueId : book.id} 
                className="w-[285px] sm:w-[340px] shrink-0"
              >
                <Card noPadding hoverEffect className="group flex flex-col h-full">
                  <div className={`relative h-48 ${book.coverColor} border-b-3 border-border overflow-hidden`}>
                    {book.imageLink ? (
                      <Image
                        src={book.imageLink}
                        alt={book.title}
                        placeholder="blur"
                        blurDataURL={book.imageLink}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none"
                        draggable={false}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
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
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground line-through text-sm">
                            ₹{book.originalPrice}
                          </span>
                          {book.originalPrice > book.price && (
                            <span className="bg-nb-lime text-black border-2 border-border px-1.5 py-0.5 text-xs font-black uppercase rounded shadow-[1px_1px_0px_0px_var(--brutal-black)]">
                              {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                            </span>
                          )}
                        </div>
                        <span className="text-2xl font-black mt-1 block">
                          ₹{book.price}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleBuyNow(book)}
                        className="btn-brutal btn-brutal-sm"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job & Career Highlights */}
      <div
        className="bg-card border-3 border-border p-4 sm:p-8 rounded-xl"
        style={{ boxShadow: "5px 5px 0px 0px var(--brutal-black)" }}
      >
        <h2 className="font-bold text-2xl sm:text-3xl mb-4 sm:mb-6 flex items-center gap-3">
          <Briefcase className="text-brutal-purple" />
          {jobData?.title || "Job & Career Highlights"}
        </h2>
        <div className="space-y-4">
          {jobsToDisplay.map((job) => (
            <div
              key={job.id}
              onClick={() => {
                if (job.link && job.link !== "#") {
                  window.open(job.link, "_blank");
                }
              }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-muted border-2 border-border hover:bg-nb-lime transition-colors cursor-pointer rounded-lg"
            >
              <div className="bg-brutal-dark text-white px-3 py-1 font-bold text-sm whitespace-nowrap rounded-md">
                {job.badgeDate}
              </div>
              <div className="grow">
                <h4 className="font-bold text-lg">
                  {job.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {job.description}
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
