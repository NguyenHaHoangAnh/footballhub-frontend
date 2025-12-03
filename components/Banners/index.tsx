import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useBannerData } from "./config";
import Image from "next/image";

export default function Banners() {
    const bannerData = useBannerData();
    const carouselOptions: any = { loop: true, align: "start", dragFree: false, };
    const carouselPlugins: any = [ Autoplay({ playOnInit: true, stopOnInteraction: false, delay: 10000 }) ];
    const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, carouselPlugins);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    return (
        <section className="relative mt-[70px] w-full h-[240px] sm:h-[600px] md:h-[calc(100vh-70px)]">
            {/* Carousel */}
            <div 
                ref={emblaRef}
                id="banner-carousel" 
                className="w-full h-full mb-10 md:mb-0 overflow-hidden"
            >
                <div className="flex items-stretch ml-0 w-full h-full">
                    {Array.isArray(bannerData) && bannerData.map((banner) => (
                        <div key={banner.id} className="relative flex items-center justify-center flex-[0_0_100%] w-full overflow-hidden">
                            <Image 
                                className="object-cover blur-[20px] scale-125"
                                src={banner.src}
                                alt={banner.alt}
                                fill
                            />
                            <Image 
                                className="object-contain"
                                src={banner.src}
                                alt={banner.alt}
                                fill
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === selectedIndex ? "bg-white scale-110" : "bg-white/40 hover:bg-white/70"
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}