import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-gray-500">
      <CardHeader>
        <CardTitle>Fetching data from backend</CardTitle>
        <CardDescription>Please wait</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{children}</p>
      </CardContent>
      <CardFooter>
        <p>Hope you enjoyed this demo :3</p>
      </CardFooter>
    </Card>
  );
}
