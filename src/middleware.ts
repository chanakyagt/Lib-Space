// export { auth as middleware } from "@/auth";

import { auth } from "@/auth";
export default auth((req) => {
  const isLoggedIn=!!req.auth;
  const {nextUrl}=req;
  // if(nextUrl.pathname==="/api/auth/signin")return null;

  if(!isLoggedIn &&nextUrl.pathname!="/api/auth/signin" )
    return Response.redirect(new URL("/api/auth/signin",nextUrl))
  
});
export const config = {
  matcher: ["/add-book","/add-user","/users","/books","/dashboard"],
};
