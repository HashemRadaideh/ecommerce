import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ProductSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className={cn("h-[55px] w-[180px]")} />
        </CardTitle>
        <CardDescription>
          <Skeleton className={cn("h-[35px] w-[160px]")} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className={cn("h-[180px] w-[180px]")} />
      </CardContent>
      <CardFooter className={cn("space-y-1 flex flex-col")}>
        <Skeleton className={cn("h-[25px] w-[80px]")} />
        <Skeleton className={cn("h-[25px] w-[80px]")} />
      </CardFooter>
    </Card>
  );
}
