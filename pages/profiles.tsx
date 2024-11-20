import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="flex h-full justify-center items-center">
      <div className="flex flex-col ">
        <h1 className="text-white text-4xl md:text-6xl text-center">
          Who is watching?
        </h1>
        <div className="flex justify-center items-center gap-8 mt-10 ">
          <div
            onClick={() => router.push("/")}
            className="group flex-row w-44 mx-auto"
          >
            <div className="w-44 h-44 rounded-md flex justify-center items-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden ">
              <img src="/images/default-user.png" alt="profile" />
            </div>
            <div className="mt-4 text-2xl text-gray-400 text-center group-hover:text-white">
              {user?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
