import {
  authMiddleware,
  redirectToSignIn,
  redirectToSignUp,
} from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      if (req.url === "/sign-up") {
        return redirectToSignUp({ returnBackUrl: "/sign-up" });
      } else if (req.url === "/sign-in") {
        return redirectToSignIn({ returnBackUrl: "/sign-in" });
      }
    }
  },
  publicRoutes: [
    "/",
    "/api/webhooks(.*)",
    "/api/uploadthing",
    "/:username",
    "/search",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
