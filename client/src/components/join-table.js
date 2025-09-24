'use client'
import { dataFormateToDash } from '@/hooks/dateFormat'
import api from '@/hooks/useApi'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AddAuthor } from './add-author'
import { AddBook } from './add-book'
import { Button } from './ui/button'
import { InfiniteRowModelModule } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule, InfiniteRowModelModule])

export default function JoinTable() {
  const gridRef = useRef(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const [colDefs, setColDefs] = useState([
    { field: "author_id", hide: true },
    { field: "book_id", hide: true },
    { field: "author_name", headerName: "Автор", editable: true },
    { field: "royalties", headerName: "Гонорары", editable: true },
    { field: "birth_date", headerName: "Дата рождения", editable: true },
    { field: "awards_count", headerName: "Кол-во наград", editable: true },
    { field: "book_name", headerName: "Книга", editable: true },
    { field: "avg_rating", headerName: "Рейтинг", editable: true },
    { field: "created_at", headerName: "Дата выхода", editable: true },
    { field: "page_count", headerName: "Кол-во страниц", editable: true },
  ])

  const rowSelection = useMemo(() => {
    return { mode: "singleRow" }
  }, [])

  const onGridReady = (params) => {
    const datasource = {
      getRows: async (params) => {
        const limit = params.endRow - params.startRow
        const offset = params.startRow

        try {
          const res = await api.get(`/authors/books?limit=${limit}&offset=${offset}`)
          const rows = res.data.rows.flatMap(author => {
            if (author.Books && author.Books.length > 0) {
              return author.Books.map(book => ({
                author_id: author.author_id,
                author_name: author.name,
                royalties: author.royalties,
                birth_date: author.birth_date,
                awards_count: author.awards_count,
                book_id: book.book_id,
                book_name: book.name,
                avg_rating: book.avg_rating,
                created_at: book.created_at,
                page_count: book.page_count,
              }))
            } else {
              return [{
                author_id: author.author_id,
                author_name: author.name,
                royalties: author.royalties,
                birth_date: author.birth_date,
                awards_count: author.awards_count,
                book_id: null,
                book_name: null,
                avg_rating: null,
                created_at: null,
                page_count: null,
              }]
            }
          })
          const totalRows = res.data.total
          params.successCallback(rows, totalRows)
        } catch (error) {
          console.log(error)
          params.failCallback()
        }
      }
    }

    params.api.setGridOption('datasource', datasource)
  }

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.refreshInfiniteCache()
    }
  }, [refreshKey])

  async function updateCell(cell, value) {
    try {
      const bookCells = ['book_name', 'avg_rating', 'page_count', 'created_at']
      const authorCells = ['author_name', 'royalties', 'birth_date', 'awards_count']
      let body = {}
      if (cell === 'book_name' || cell === 'author_name') {
        const field = cell.split('_')[1]
        body[field] = value[cell]
      }
      else if (cell === 'birth_date' || cell === 'created_at') {
        body[cell] = dataFormateToDash(value[cell])
      }
      else {
        body[cell] = value[cell]
      }
      console.log(body)
      if (bookCells.includes(cell)) {
        const res = await api.put(`/books/${value.book_id}`, body)
        if (res.status !== 200) {
          throw new Error(`error updating book, status: ${res.status}`)
        }
      }
      if (authorCells.includes(cell)) {
        const res = await api.put(`/authors/${value.author_id}`, body)
        if (res.status !== 200) {
          throw new Error(`error updating author, status: ${res.status}`)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setRefreshKey(prev => prev + 1)
    }
  }

  async function deleteBook() {
    if (!gridRef.current || !gridRef.current.api.getSelectedNodes()[0]) return
    const book_id = gridRef.current.api.getSelectedNodes()[0].data.book_id
    if (!book_id) return
    try {
      const res = await api.delete(`/books/${book_id}`)
      if (res.status !== 204) {
        throw new Error(`error deleting book, status: ${res.status}`)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setRefreshKey(prev => prev + 1)
    }

  }

  async function deleteAuthor() {
    if (!gridRef.current || !gridRef.current.api.getSelectedNodes()[0]) return
    const author_id = gridRef.current.api.getSelectedNodes()[0].data.author_id
    if (!author_id) return
    try {
      const res = await api.delete(`/authors/${author_id}`)
      if (res.status !== 204) {
        throw new Error(`error deleting author, status: ${res.status}`)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setRefreshKey(prev => prev + 1)
    }
  }

  return (
    <div className='w-full h-[500px] flex flex-col gap-3' size='sm'>
      <div className='self-end flex gap-1'>
        <AddAuthor onClose={() => setRefreshKey(prev => prev + 1)} />
        <AddBook onClose={() => setRefreshKey(prev => prev + 1)} />
        <Button onClick={deleteBook} variant="outline">Удалить книгу <Trash2 /></Button>
        <Button onClick={deleteAuthor} variant="outline">Удалить автора <Trash2 /></Button>
      </div>
      <AgGridReact
        rowModelType="infinite"
        cacheBlockSize={50}
        onGridReady={onGridReady}
        ref={gridRef}
        columnDefs={colDefs}
        rowSelection={rowSelection}
        onCellValueChanged={async (params) => {
          console.log('Updated cell:', params.data)
          console.log("Column field:", params.colDef.field)
          await updateCell(params.colDef.field, params.data)
        }}
        className="ag-theme-alpine"
      />
    </div>
  )
}
