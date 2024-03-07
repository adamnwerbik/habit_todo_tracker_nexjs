import SignUpButton from "@/components/SignUpButton";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-full   items-center">
      <div className="bg-blue-100 flex flex-col items-center min-h-[98lvh] justify-center pt-20">
        <h1 className="text-4xl lg:text-6xl font-semibold text-balance text-center">
          habitTracker: The perfect tool to keep you organised!
        </h1>
        <h2 className="text-balance text-center">
          Track your habits and stay on top of your todos.
        </h2>
        <h4 className="text-balance text-center">100% free, forever...</h4>
        <div className="m-10">
          <SignUpButton />
        </div>
        <Image
          src={"/habits.gif"}
          width={400}
          height={400}
          alt="uyaya"
          className=" max-w-full md:w-[700px] xl:w-[1000px] rounded"
        />
      </div>

      <div className="bg-purple-100 flex flex-col items-center min-h-[100lvh] justify-evenly pt-20">
        {" "}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-balance text-center my-2">
            View habit summaries and keep track of streaks!
          </h1>{" "}
          <h2 className="text-balance text-center">
            Keep track of habit strength and see trends over the year.
          </h2>
        </div>
        <Image
          src={"/summary.gif"}
          width={500}
          height={500}
          alt="uyaya"
          className=" max-w-[90%] md:w-[700px] xl:w-[1000px] rounded"
        />
      </div>
      <div className="bg-yellow-100 flex flex-col items-center min-h-[100lvh] justify-evenly pt-20">
        {" "}
        <h1 className="text-3xl font-semibold text-balance text-center">
          Mark your habits complete and see them in order of importance!
        </h1>
        <h2 className="text-balance text-center">
          Lighting fast updates; no page refreshes needed.
        </h2>
        <Image
          src={"/todos.gif"}
          width={500}
          height={500}
          alt="uyaya"
          className="max-w-[40%] lg:max-w-[30%] "
        />
      </div>
      <div className="bg-green-100 flex flex-col items-center min-h-[100lvh] justify-center pt-20">
        {" "}
        <h1 className="text-3xl font-semibold text-balance text-center mb-10">
          What are you waiting for?
        </h1>
        <SignUpButton />
      </div>
    </div>
  );
}
