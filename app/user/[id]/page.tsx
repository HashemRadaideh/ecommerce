import axios from "axios";

import { User } from "@/api/models/users";

export async function generateStaticParams() {
  const response = await axios.get<User[]>("http://localhost:8080/api/users");
  const data = response.data.map((value) => value.id);
  return data;
}

export default function UserId({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <p>{id}</p>
    </>
  );
}
