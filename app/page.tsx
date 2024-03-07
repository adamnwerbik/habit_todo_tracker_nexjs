import AuthButton from "@/components/AuthButton";
import SignUpButton from "@/components/SignUpButton";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function page() {
  return (
    <div className="w-full   items-center">
      <div className="bg-blue-100 flex flex-col items-center min-h-[98lvh] justify-center pt-20">
        <h1 className="text-3xl font-semibold text-balance text-center">
          habitTracker: The perfect tool to keep you organised!
        </h1>
        <h2>Track your habits and stay on top of your todos.</h2>
        <h2>100% free, forever.</h2>
        <div className="m-10">
          <SignUpButton />
        </div>
      </div>
      <div className="bg-red-100 flex flex-col items-center min-h-[100lvh] justify-evenly pt-20">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-balance text-center">
            Enjoy optimistic UI updates and sync across devices!
          </h1>
          <h2 className="text-balance text-center lg:max-w-lg">
            Lighting fast updates; no page refreshes needed.
          </h2>
        </div>

        <Image
          src={"/habits.gif"}
          width={400}
          height={400}
          alt="uyaya"
          className=" max-w-full md:w-[700px] xl:w-[1000px] rounded"
        />
      </div>{" "}
      <div className="bg-purple-100 flex flex-col items-center min-h-[100lvh] justify-evenly pt-20">
        {" "}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-balance text-center my-2">
            View habit summaries and keep track of streaks!
          </h1>{" "}
          <h2 className="text-balance text-center lg:max-w-lg">
            Keep track of your habit strengths with the HabitStrength gauge; and
            use the year overview to see trends over time.
          </h2>
        </div>
        <Image
          src={"/summary.gif"}
          width={500}
          height={500}
          alt="uyaya"
          className=" max-w-full md:w-[700px] xl:w-[1000px] rounded-sm"
        />
      </div>
      <div className="bg-yellow-100 flex flex-col items-center min-h-[100lvh] justify-evenly pt-20">
        {" "}
        <h1 className="text-3xl font-semibold text-balance text-center">
          Mark your habits complete and see them in order of importance!
        </h1>
        <h2 className="text-balance text-center lg:max-w-lg">
          Support for starred tasks; as well as date and time due. Priority is
          given to tasks which are starred and have a specific due date.
        </h2>
        <Image
          src={"/todos.gif"}
          width={500}
          height={500}
          alt="uyaya"
          className="max-w-[40%] lg:max-w-[30%] "
        />
      </div>
    </div>
  );
}
