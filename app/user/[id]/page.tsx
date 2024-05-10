import axios from "axios";

import { User } from "@/api/models/users";
import { api } from "@/lib/utils";

export async function generateStaticParams() {
  return await axios.get<User[]>(api + "/api/users");
}

export default function UserId({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <p>{id}</p>
    </>
  );
}
