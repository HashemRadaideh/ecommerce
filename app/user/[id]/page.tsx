import axios from "axios";

import { User } from "@/api/models/users";
import { api } from "@/lib/utils";

export async function generateStaticParams() {
  const response = await axios.get<User[]>(api + "/api/users");
  return response.data;
}

export default function UserId({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <p>{id}</p>
    </>
  );
}
