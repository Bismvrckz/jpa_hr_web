import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function loginPage() {
  const [isLogged, setIsLogged] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  async function getSessionAsync() {
    try {
      const session = await getSession();
      if (session) router.push("/");
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    getSessionAsync();
  }, [isLogged]);

  async function loginController() {
    try {
      await signIn("credentials", {
        redirect: false,
        username: credentials.username,
        password: credentials.password,
      });

      setIsLogged(true);
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-sky-900 text-white">
      <div className="w-[30vw] h-[30vw] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-10 rounded-[2vh]">
        <p className="text-[3rem]">Login</p>
        <Input
          style={{ marginTop: "5%", marginBottom: "5%" }}
          placeholder="Usename"
          variant={"filled"}
          onChange={(e) => {
            setCredentials({ ...credentials, username: e.target.value });
          }}
        />
        <Input
          style={{ marginTop: "5%", marginBottom: "5%" }}
          placeholder="Password"
          variant={"filled"}
          type="password"
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <Button colorScheme={"linkedin"} onClick={loginController}>
          Login
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession({ req: context.req });

    if (session) {
      return { redirect: { destination: "/" } };
    }

    return {
      props: {},
    };
  } catch (error) {
    return { props: { error } };
  }
}
