import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AuthorTable from "@/components/author-table"
import JoinTable from "@/components/join-table"


export default function Home() {

  return (
    <Card className="w-9/10 mx-auto">
      <CardHeader>
        <CardTitle>Главная таблица</CardTitle>
        <CardDescription>
          Группированная таблица с авторами и их книгами
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <JoinTable />
      </CardContent>
      <CardFooter className="flex-col gap-2">
      </CardFooter>
    </Card>)
}
