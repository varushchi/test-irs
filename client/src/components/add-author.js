'use cluent'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/hooks/useApi"
import { UserPen } from "lucide-react"
import { useRef, useState } from "react"

export function AddAuthor({ onClose }) {
  const [input, setInput] = useState({
    name: '',
    royalties: '',
    birth_date: '',
    awards_count: ''
  })

  const ref = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.name) return
    try {
      const body = Object.fromEntries(
        Object.entries(input)
          .filter(([_, value]) => value)
          .map(([key, value]) => {
            if (key === 'royalties' || key === 'awards_count') {
              return [key, Number(value)]
            }
            return [key, value]
          })
      )
      console.log(body)
      const res = await api.post('/authors', body)
      if (res.status !== 201) {
        throw new Error(`error creating authors, status: ${res.status}`)
      }
      setInput({
        name: '',
        royalties: '',
        birth_date: '',
        awards_count: ''
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
          <Button variant="outline">Создать автора <UserPen /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Создать автора</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="author">Автор *</Label>
              <Input
                id="author"
                name="author"
                placeholder="John Doe"
                value={input.name}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="royalties">Гонорары</Label>
              <Input
                id="royalties"
                name="royalties"
                type="number"
                step="0.01"
                min="0"
                placeholder="12345.00"
                value={input.royalties}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, royalties: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="birth_date">Дата рождения</Label>
              <Input
                id="birth_date"
                name="birth_date"
                value={input.birth_date}
                type='date'
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, birth_date: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="awards_count">Кол-во наград</Label>
              <Input
                id="awards_count"
                name="awards_count"
                type="number"
                placeholder="5"
                min="0"
                value={input.awards_count}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, awards_count: e.target.value }))
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
