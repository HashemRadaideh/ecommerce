import { Navbar } from "@/components/Navbar";
import ProductPage from "@/components/ProductPage";

export default function UserId({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Navbar />

      <main className="grid grid-cols-2 flex-col pl-3">
        <ProductPage id={id} />
      </main>
    </>
  );
}
