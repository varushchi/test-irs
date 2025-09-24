
'use cluent'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/hooks/useApi"
import { Book } from "lucide-react"
import { useRef, useState } from "react"
import { SelectAuthors } from "./author-select"

export function AddBook({ onClose }) {
  const [input, setInput] = useState({
    name: '',
    author_id: '',
    avg_rating: '',
    created_at: '',
    page_count: ''
  })

  const ref = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.name || !input.author_id) return
    try {
      const body = Object.fromEntries(
        Object.entries(input)
          .filter(([_, value]) => value)
          .map(([key, value]) => {
            if (key === 'page_count' || key === 'avg_rating') {
              return [key, Number(value)]
            }
            return [key, value]
          })
      )
      const res = await api.post('/books', body)
      if (res.status !== 201) {
        throw new Error(`error creating book, status: ${res.status}`)
      }
      setInput({
        name: '',
        author_id: '',
        avg_rating: '',
        created_at: '',
        page_count: ''
      })
      onClose()
      ref.current?.click()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger ref={ref} asChild>
          <Button variant="outline">Создать книгу <Book /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Создать книгу</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="book">Книга *</Label>
              <Input
                id="book"
                name="book"
                placeholder="John Doe's book"
                value={input.name}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author">Автор *</Label>
              <SelectAuthors
                htmlId="author"
                onChange={(id) =>
                  setInput((prev) => ({ ...prev, author_id: id }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="avg_rating">Рейтинг</Label>
              <Input
                id="avg_rating"
                name="avg_rating"
                type="number"
                step="0.1"
                min="0"
                max="9.9"
                placeholder="7.5"
                value={input.avg_rating}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, avg_rating: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="created_at">Дата рождения</Label>
              <Input
                id="created_at"
                name="created_at"
                value={input.created_at}
                type='date'
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, created_at: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="page_count">Кол-во наград</Label>
              <Input
                id="page_count"
                name="page_count"
                type="number"
                min="0"
                placeholder="100"
                value={input.page_count}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, page_count: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Создать</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
