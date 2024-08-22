import {auth} from "~/auth"
import {ProfileForm} from "~/app/ui/profile/profile-form"
import {redirect} from "next/navigation";
import  ProfileImage  from "~/app/ui/profile/profile-image";
import { getUsers } from "~/server/db/actions";

export default async function ProfilePage() {
    const session = await auth();
    if (!session) return redirect("/");

    const user = await getUsers();
    
    return (
        <div className="grid lg:grid-cols-2 gap-8 mt-16 m-28" >
        <ProfileForm user = {user}/>
        <ProfileImage user = {user}/>
        </div>

    );
}