'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from "@/hooks/useApi"
import { useEffect, useState } from "react"

export function SelectAuthors({ htmlId, onChange }) {
  const [selected, setSelected] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    async function getOptions() {
      try {
        const res = await api.get('/authors')
        if (res.status !== 200) {
          throw new Error(`error fetching authors, status: ${res.status}`)
        }
        const result = res.data.map(author => {
          return {
            name: author.name,
            id: author.author_id
          }
        })
        setOptions(result)
      } catch (error) {
        console.log(error)
      }
    }
    getOptions()
  }, [])

  function handleValueChange(value) {
    setSelected(value)
    onChange?.(value)
  }

  return (
    <Select value={selected} id={htmlId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Выбрать автора из списка" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Авторы</SelectLabel>
          {options.map(option => (
            <SelectItem value={option.id} key={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
