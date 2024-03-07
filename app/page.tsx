import AuthButton from "@/components/AuthButton";
import SignUpButton from "@/components/SignUpButton";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function page() {
  return (
    <div className="w-full md:max-w-[768px] lg:max-w-[1024px]  items-center">
      <div className="bg-blue-100 flex flex-col items-center min-h-[60lvh] justify-center pt-20">
        <h1 className="text-3xl font-semibold text-balance text-center">
          habitTracker: The perfect tool to keep you organised!
        </h1>
        <h2>Track your habits and stay on top of your todos.</h2>
        <h2>100% free, forever.</h2>
        <div className="m-10">
          <SignUpButton />
        </div>
      </div>

      <div className="bg-red-100 flex flex-col items-center min-h-[60lvh] justify-center pt-20">
        <h1 className="text-3xl font-semibold text-balance text-center">
          habitTracker: The perfect tool to keep you organised!
        </h1>
        <Image
          src={"/habits.gif"}
          width={500}
          height={500}
          alt="uyaya"
          className="min-w-[70%] "
        />
      </div>

      <div className="bg-yellow-100 flex flex-col items-center min-h-[60lvh] justify-center pt-20">
        {" "}
        <h1 className="text-3xl font-semibold text-balance text-center">
          Mark your habits complete
        </h1>
        <Image
          src={"/todos.gif"}
          width={500}
          height={500}
          alt="uyaya"
          className="max-w-[40%] "
        />
      </div>
    </div>
  );
}
