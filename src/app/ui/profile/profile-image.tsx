

import Image from "next/image";


export default async function ProfileImage({user}: {user: any}) {
  return (
    <Image src={user[0].image} alt="profile" width={600} height={600} />
);
}
