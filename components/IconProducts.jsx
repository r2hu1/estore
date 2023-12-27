"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Product from "./Product";

export default function IconProducts() {
    const product = [
        {
            name: "Svg Icon Pack",
            image: "https://www.sketchappsources.com/resources/source-image/essentials-icon-pack-deemak-daksina.jpg",
            price: '25$',
            link: "#"
        },
        {
            name: "Editing Icon Pack",
            image: "https://www.sketchappsources.com/resources/source-image/essentials-icon-pack-deemak-daksina.jpg",
            price: '15$',
            link: "#"
        }
    ];
    return (
        <section className="px-6 py-10 md:px-20">
            <div className="flex flex-col mb-6 justify-center items-center" id="icons">
                <h1 className="text-lg font-bold gradientText">
                    Icons
                </h1>
                <p className="text-xs mt-0">svg icons for your website.</p>
            </div>
            <div className="flex flex-wrap md:gap-4 gap-6 items-center justify-center">

                {
                    product.map((item, index) => (
                        <Product
                            key={index}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            link={item.link}
                        />
                    ))
                }

            </div>
        </section>
    );
}