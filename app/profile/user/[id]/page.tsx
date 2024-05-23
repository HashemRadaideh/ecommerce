import Usernav from "@/components/Usernav";

export default function Admin({ params }: { params: { id: string } }) {
  return (
    <>
      <Usernav id={params.id} />
    </>
  );
}
