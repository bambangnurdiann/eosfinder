"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Navbar } from "@/components/navbar"
import engineerData from "@/lib/data.json"
import type { Engineer } from "@/lib/types"

export default function AdvancedSearch() {
  const [filters, setFilters] = useState({
    "NAMA EOS": "",
    "NAMA CC": "",
    "WITEL EOS-NEW": "",
  })
  const [filteredData, setFilteredData] = useState<Engineer[]>(engineerData)

  // Live filtering effect
  useEffect(() => {
    const filtered = engineerData.filter((engineer) => {
      const nameMatch =
        !filters["NAMA EOS"] ||
        (engineer["NAMA EOS"]?.toLowerCase()?.includes(filters["NAMA EOS"].toLowerCase().trim()) ?? false);

      const ccMatch =
        !filters["NAMA CC"] ||
        (engineer["NAMA CC"]?.toLowerCase()?.includes(filters["NAMA CC"].toLowerCase().trim()) ?? false);

      const locationMatch =
        !filters["WITEL EOS-NEW"] ||
        (engineer["WITEL EOS-NEW"]?.toLowerCase()?.trim() === filters["WITEL EOS-NEW"].toLowerCase().trim() ?? false);

      return nameMatch && ccMatch && locationMatch;
    });

    setFilteredData(filtered);
  }, [filters]); // Runs whenever filters change

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleReset = () => {
    setFilters({
      "NAMA EOS": "",
      "NAMA CC": "",
      "WITEL EOS-NEW": "",
    });
    // No need to setFilteredData here since useEffect will handle it
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Advanced Search</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">NAMA EOS</label>
            <Input
              placeholder="Search by engineer name..."
              value={filters["NAMA EOS"]}
              onChange={(e) => handleFilterChange("NAMA EOS", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">NAMA CC</label>
            <Input
              placeholder="Search by company name..."
              value={filters["NAMA CC"]}
              onChange={(e) => handleFilterChange("NAMA CC", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LOKASI SITE</label>
            <Input
              placeholder="Search by location..."
              value={filters["WITEL EOS-NEW"]}
              onChange={(e) => handleFilterChange("WITEL EOS-NEW", e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">Enter exact location (e.g., "BANDUNG")</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
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
                {filteredData.length > 0 ? (
                  filteredData.map((engineer) => (
                    <TableRow key={engineer.NIK}>
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