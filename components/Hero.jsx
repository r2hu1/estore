import { Button } from "./ui/button";
import Link from "next/link";
import { currentUser } from '@clerk/nextjs';
import Filters from "./utlis/Filter";


export default async function Hero({vlv}) {
    const user = await currentUser();
    return (
        <div className="text-center py-20 px-8 flex flex-col gap-6 justify-center items-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-15 dark:opacity-25 blur-[100px]"></div></div>
            <div className="max-w-lg mx-auto">
                <h1 className="font-bold md:text-4xl text-3xl">Your marketplace for high-quality <span className="gradientText">digital assests</span>.</h1>
                <p className="md:text-sm text-xs mt-2 max-w-md mx-auto">Welcome to Estore. Every assest on our platform is verified by our team to ensure our highest quality standards</p>
            </div>
            {!user ? (
                <div className="flex gap-3">
                    <Button asChild><Link href={!user ? "/sign-up" : "#templates"}>{!user ? "Get Started" : "Latest Products"}</Link></Button>
                    <Button variant="outline" asChild><Link href={!user ? "#templates" : "#templates"}>{!user ? "Explore Products" : "All Products"}</Link></Button>
                </div>
            ) : (
                <Filters values={vlv}/>
            )}
        </div>
    );
};
