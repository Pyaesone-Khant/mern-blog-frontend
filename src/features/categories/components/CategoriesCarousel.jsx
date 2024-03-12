import {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel from "embla-carousel-react";
import "./style.css"
import CategoryBtn from "@/features/categories/CategoryBtn.jsx";
import {CustomBtn} from "@/components/index.js";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md";
import {cn} from "@/utils.js";
import {useResponsive} from "@/hooks/useResponsive.js";

const CategoriesCarousel = ({categories}) => {

    const {isMobile} = useResponsive();

    const options = {
        loop: false,
        align: "start",
        containScroll: "trimSnaps",
        dragFree: true,
        slidesToScroll: 1,
        watchResize: true,
    }

    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setCanScrollPrev(emblaApi?.canScrollPrev())
            setCanScrollNext(emblaApi?.canScrollNext())
        }

        emblaApi.on("select", onSelect)
        emblaApi.on("resize", onSelect)
        emblaApi.on("scroll", onSelect)
        onSelect()

        return () => emblaApi.off("select", onSelect)
    }, [
        emblaApi
    ])


    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <section className={`w-full relative bg-black/10 dark:bg-white/[0.05] rounded-full `}>
            <div className={`embla py-3 md:max-w-[85%] lg:max-w-full mx-auto rounded-full`} ref={emblaRef}>
                <div className="embla__container">
                    {categories?.map((category) => (<div className={"embla__slide"} key={category?._id}>
                        <CategoryBtn category={category}/>
                    </div>))}
                </div>
            </div>

            {!isMobile && <CustomBtn size={"xs"} onClick={scrollPrev}
                                     className={cn(
                                         "!rounded-full px-0 w-8 absolute left-2 lg:-left-10 top-1/2 transform -translate-y-1/2 ", {"hidden": !canScrollPrev})}>
                <MdOutlineArrowBackIos/>
            </CustomBtn>}
            {
                !isMobile && <CustomBtn size={"xs"} onClick={scrollNext}
                                        className={cn("!rounded-full px-0 w-8  absolute right-2 lg:-right-10 top-1/2 transform -translate-y-1/2", {
                                            "hidden": !canScrollNext
                                        })}>
                    <MdOutlineArrowForwardIos/>
                </CustomBtn>
            }
        </section>
    );
};

export default CategoriesCarousel;
