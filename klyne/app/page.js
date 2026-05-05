import { redirect } from "next/navigation";

export default function Home() {
  // Redirect the root path directly to our /users page
  redirect("/users");
}
