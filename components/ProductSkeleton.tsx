import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-[55px] w-[200px] rounded-xl" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-[200px]" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-5 w-[200px]" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-5 w-[200px]" />
      </CardFooter>
    </Card>
  );
}
