import Product from "@/components/Product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { database, getTemplates } from "@/lib/appwrite";
import { template } from "@/products/template";
import { Query } from "appwrite";
import { Check, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: 'E-Book',
};

export default async function Page({ params }) {
    let { documents } = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_EBOOKS_COLLECTION_ID,
        [
            Query.equal('$id', params.id)
        ],
    );

    const { name, image, price, description, url } = documents[0];

    let { documents: similar } = await database.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_EBOOKS_COLLECTION_ID,
    );

    return (
        <main className="px-8 md:px-20 py-20">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-0 blur-[100px]"></div></div>
            <div className="grid">
                <div>
                    <div>
                        <div className="mb-2">
                            <h1 className="text-3xl font-bold">
                                {name}
                            </h1>
                            <p className="text-sm mt-1 mb-3">
                                {description}
                            </p>
                        </div>
                        <div className="flex gap-2 mb-6">
                            <Badge>{price}</Badge>
                            <Badge>E-Books</Badge>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <img className="rounded-lg" src={image} alt={name} />
                    </div>
                    <div className="mt-6">
                        <Button className="w-full" asChild><a href={url}>Buy Now</a></Button>
                    </div>
                </div>
            </div>

            <div className="py-[100px] bg-none relative -mb-6">
                <div className="flex flex-col mb-6 justify-center items-center">
                    <h1 className="text-lg font-bold gradientText">
                        Similar Products
                    </h1>
                    <p className="text-xs mt-0">we thought you may like this also.</p>
                </div>
                <Product name={similar[0].name} image={similar[0].image} price={similar[0].price} link={similar[0].url} />
            </div>
        </main>
    )
}