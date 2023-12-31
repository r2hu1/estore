import Product from "@/components/Product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { database, getTemplates } from "@/lib/appwrite";
import { Query } from "appwrite";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import PreviewImage from "../../_components/PreviewImage";

export async function generateMetadata({ params, searchParams }) {
    try {
        const { documents: product } = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_TEMPLATES_COLLECTION_ID,
            [
                Query.equal('$id', params.id)
            ],
        );
        let { name, image, price, description, url } = await product[0];
        return {
            metadataBase: `https://${searchParams}`,
            title: name,
            description: description,
            openGraph: {
                images: image,
            },
        }
    }
    catch (err) {
        return {
            title: "Not Found"
        }
    }
}

export default async function Page({ params }) {
    try {
        const user = await currentUser();

        let { documents } = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_TEMPLATES_COLLECTION_ID,
            [
                Query.equal('$id', params.id)
            ],
        );
        const { name, image, price, description, url } = documents[0];

        let { documents: similar } = await database.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.APPWRITE_TEMPLATES_COLLECTION_ID,
            [
                Query.notEqual("name", name)

            ],
        );


        return (
            <main className="px-8 md:px-20 py-24 lg:px-[120px] grid place-items-center md:block">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 dark:opacity-25 mb-10 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-primary opacity-15 blur-[100px]"></div></div>
                <div className="flex gap-2 text-xs justify-start items-start w-full mb-3 px-1">
                    <span>Product</span>
                    <span>/</span>
                    <span>Template</span>
                    <span>/</span>
                    <span>{name}</span>
                </div>
                <div className="grid md:flex gap-6 justify-between">
                    <div className="flex flex-col justify-between">
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
                                <Badge>Templates</Badge>
                            </div>
                        </div>
                        <div>
                            <div className="grid gap-2">
                                <div className="flex gap-3 items-center">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <p className="text-xs">Secure payments!</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <p className="text-xs">Anytime downloads!</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <p className="text-xs">Avilable for instant delevery!</p>
                                </div>
                            </div>
                            <div className="mt-6 hidden md:flex gap-2">
                                <PreviewImage url={image} />
                                <Button className="w-full" asChild><Link href={!user ? "/sign-in" : url}>Buy Now</Link></Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-lg">
                        <div className="overflow-hidden rounded-lg">
                            <img className="rounded-lg md:max-h-[340px] md:min-w-full transition hover:scale-105" src={image} alt={name} />
                        </div>
                        <div className="mt-6 flex gap-2 md:hidden">
                            <PreviewImage url={image} />
                            <Button className="w-full" asChild><Link href={!user ? "/sign-in" : url}>Buy Now</Link></Button>
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
                    <div className="md:flex md:gap-4 gap-6 grid place-content-center">
                        {
                            similar.map((item, index) => (
                                <Product key={index} name={item.name} image={item.image} price={item.price} link={`/product/template/${item.$id}`} />
                            ))
                        }
                    </div>
                </div>
            </main>
        )
    }
    catch (e) {
        return (
            <main className="px-8 md:px-20 py-24 lg:px-[120px] grid place-items-center">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="dark:opacity-25 absolute left-0 right-0 top-0 mb-10 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-primary opacity-15 blur-[100px]"></div></div>
                <div className="flex flex-col mb-6 justify-center items-center">
                    <h1 className="text-lg font-bold gradientText">
                        Not Found
                    </h1>
                    <p className="text-xs mt-0">error product not found, check for typo errors.</p>
                </div>
                <div>
                    <Filters />
                    <Button asChild className="w-full mt-4"><Link href="/">Go To Homepage</Link></Button>
                </div>
            </main>
        )
    }
}