import { LoginForm } from "~/app/ui/login/loginForm";
import {SignIn} from "~/app/ui/login/signin-button";

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <LoginForm />
        <SignIn />
      </div>
    </div>
  );
}
