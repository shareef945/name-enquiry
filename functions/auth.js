

// server-side function to validate user's authentication status
const isAuthenticated = (req) => {
  // check if req.session.user or req.cookies.token exists
  // return true if the user is authenticated or redirect to the login page
};

import { useRouter } from "next/router";

export const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    if (!isAuthenticated()) {
      // redirect to login page if user is not authenticated
      router.push("/login");
      return null;
    }

    // if user is authenticated, render the original component
    return <WrappedComponent {...props} />;
  };

  return Auth;
};