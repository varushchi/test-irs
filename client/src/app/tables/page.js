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
import BookTable from "@/components/book-table"


export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-9/10 mx-auto">
      <Card className="w-9/10 mx-auto">
        <CardHeader>
          <CardTitle>Таблица авторов</CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardContent>
          <AuthorTable />
        </CardContent>
      </Card>
      <Card className="w-9/10 mx-auto">
        <CardHeader>
          <CardTitle>Таблица книг</CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardContent>
          <BookTable />
        </CardContent>
      </Card>
    </div>
  )
}
