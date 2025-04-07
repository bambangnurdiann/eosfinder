"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import engineerData from "@/lib/data.json"
import type { Engineer, EngineerKey } from "@/lib/types"

export default function EngineerDatabase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchField, setSearchField] = useState<EngineerKey>("NAMA EOS")
  const [filteredData, setFilteredData] = useState<Engineer[]>(engineerData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize with all data
    setFilteredData(engineerData)
  }, [])

  const handleSearch = () => {
    setLoading(true)

    if (!searchTerm.trim()) {
      setFilteredData(engineerData)
      setLoading(false)
      return
    }

    const filtered = engineerData.filter((engineer) => {
      const fieldValue = String(engineer[searchField]).toLowerCase()

      // For location searches, do an exact match
      if (searchField === "WITEL EOS-NEW") {
        return fieldValue === searchTerm.toLowerCase()
      }

      // For other fields, use partial matching
      return fieldValue.includes(searchTerm.toLowerCase())
    })

    setFilteredData(filtered)
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Simple Search</h1>
          <Link href="/advanced-search">
            <Button variant="outline">Advanced Search</Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={searchField === "NAMA EOS" ? "default" : "outline"}
              onClick={() => setSearchField("NAMA EOS")}
              className="flex-1 md:flex-none"
            >
              NAMA EOS
            </Button>
            <Button
              variant={searchField === "NAMA CC" ? "default" : "outline"}
              onClick={() => setSearchField("NAMA CC")}
              className="flex-1 md:flex-none"
            >
              NAMA CC
            </Button>
            <Button
              variant={searchField === "WITEL EOS-NEW" ? "default" : "outline"}
              onClick={() => setSearchField("WITEL EOS-NEW")}
              className="flex-1 md:flex-none"
            >
              LOKASI SITE
            </Button>
          </div>

          <Button onClick={handleSearch} className="md:w-24">
            Search
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mt-2 mb-4">
          <p>
            Note: Location searches require exact matches (e.g., "BANDUNG"). Name and company searches allow partial
            matches.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-red-600 text-white">
                  <TableHead className="font-bold">NIK</TableHead>
                  <TableHead className="font-bold">NAMA EOS</TableHead>
                  <TableHead className="font-bold">NO HP</TableHead>
                  <TableHead className="font-bold">CC/AREA</TableHead>
                  <TableHead className="font-bold">NAMA CC</TableHead>
                  <TableHead className="font-bold">LOKASI SITE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading engineers...
                    </TableCell>
                  </TableRow>
                ) : filteredData.length > 0 ? (
                  filteredData.map((engineer, index) => (
                    <TableRow key={`${engineer.NIK}-${index}`}>
                      <TableCell>{engineer.NIK}</TableCell>
                      <TableCell>{engineer["NAMA EOS"]}</TableCell>
                      <TableCell>{engineer["NO HP"]}</TableCell>
                      <TableCell>{engineer["CC/AREA"]}</TableCell>
                      <TableCell>{engineer["NAMA CC"]}</TableCell>
                      <TableCell>{engineer["WITEL EOS-NEW"]}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No engineers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        <div className="container mx-auto">Engineer On Site Database © {new Date().getFullYear()}</div>
      </footer>
    </div>
  )
}
