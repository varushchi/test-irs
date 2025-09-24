'use client'
import api from '@/hooks/useApi'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState } from 'react'
ModuleRegistry.registerModules([AllCommunityModule])

export default function BookTable() {
  const [book, setBooks] = useState([])
  const [colDefs, setColDefs] = useState([
    { field: "name", headerName: "Книга" },
    { field: "avg_rating", headerName: "Рейтинг" },
    { field: "page_count", headerName: "Дата выхода" },
    { field: "created_at", headerName: "Кол-во страниц" },
  ])

  useEffect(() => {
    async function getBooks() {
      try {
        const res = await api.get('/books')
        if (res.status !== 200) {
          throw new Error(`error fetching books, status: ${res.status}`)
        }
        setBooks(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getBooks()
  }, [])

  return (
    <div className='w-full'>
      <AgGridReact
        rowData={book}
        columnDefs={colDefs}
        domLayout="autoHeight"
        defaultColDef={{ flex: 1 }}
      />
    </div>
  )
}
