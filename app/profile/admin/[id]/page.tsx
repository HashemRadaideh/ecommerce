import Adminnav from "@/components/Adminnav";

export default function Admin({ params }: { params: { id: string } }) {
  return (
    <>
      <Adminnav id={params.id} />
    </>
  );
}
