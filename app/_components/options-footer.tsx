import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

export function OptionsFooter() {
  return (
    <footer className="bg-neutrals-100 flex items-center justify-center">
      <div className="flex max-w-[700px] flex-1 flex-col items-center p-6 text-center font-bold text-purple-700 sm:max-w-[400px]">
        <p className="text-sm">feito com 💜 em maringá-PR</p>

        <Button
          variant="secondary"
          className="mt-4 w-full max-w-[350px] p-3"
          asChild
        >
          <Link href="/estabelecimentos/pizza-hut">ver ticket</Link>
        </Button>
      </div>
    </footer>
  );
}
