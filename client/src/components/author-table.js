'use client'
import api from '@/hooks/useApi'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState } from 'react'
ModuleRegistry.registerModules([AllCommunityModule])

export default function AuthorTable() {
  const [authors, setAuthors] = useState([])
  const [colDefs, setColDefs] = useState([
    { field: "name", headerName: "Автор" },
    { field: "royalties", headerName: "Гонорары" },
    { field: "birth_date", headerName: "Дата рождения" },
    { field: "awards_count", headerName: "Кол-во наград" },
  ])

  useEffect(() => {
    async function getAuthors() {
      try {
        const res = await api.get('/authors')
        if (res.status !== 200) {
          throw new Error(`error fetching authors, status: ${res.status}`)
        }
        setAuthors(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAuthors()
  }, [])

  return (
    <div className='w-full'>
      <AgGridReact
        rowData={authors}
        columnDefs={colDefs}
        domLayout="autoHeight"
        defaultColDef={{ flex: 1 }}
      />
    </div>
  )
}
