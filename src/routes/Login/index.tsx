import { Loader } from "@/components";
import { useAuth } from "@/hooks";
import { useState } from "react";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const LoginPage = () => {
  const auth = useAuth();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<YourFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsLoading(true);

    const data = new FormData(form);

    const result = await auth?.login({
      username: data.get("username") as string | "",
      password: data.get("password") as string | "",
    });

    setIsLoading(false);

    if (result?.success === false) {
      setShowErrorMessage(true);
    }
  };

  return (
    <section className="bg-gray-50" data-test="login-page">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  data-test="login-username"
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="username"
                  required
                  pattern=".{3,}" // At least 3 characters required
                  title="Username must be at least 3 characters long"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  data-test="login-password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  required
                  pattern=".{6,}" // At least 6 characters required
                  title="Password must be at least 6 characters long"
                />
              </div>

              <div className={`text-red-500 text-sm mb-2 ${showErrorMessage ? "" : "invisible"}`}>
                Login was not successful. Please check your credentials.
              </div>

              <button
                data-test="login-submit"
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center relative h-10"
              >
                {!isLoading && "Sign in"}
                {isLoading && <Loader size="small" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
