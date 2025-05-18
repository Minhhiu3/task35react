import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const url = "https://dummyjson.com/products"

  // State gốc và state hiển thị
  const [allProducts, setAllProducts] = useState([])
  const [displayed, setDisplayed] = useState([])

  // Các state tìm kiếm + sắp xếp
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("")



  // Fetch data 
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products || [])
        setDisplayed(data.products || [])

      })
      .catch(err => console.error(err))
  }, [])


  //   searchTerm hoặc sortOrder thay đổi, recompute displayed
  useEffect(() => {
    let filtered = allProducts


    // -- Tìm kiếm theo tên (case-insensitive)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(p =>

        p.title.toLowerCase().includes(term)
      )
    }

    // -- Sắp xếp theo giá
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortOrder === "desc") {

      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    setDisplayed(filtered)
  }, [allProducts, searchTerm, sortOrder])


  return (
    <div className="App">
      <h2>Danh sách sản phẩm</h2>



      <input type="text" placeholder="Tìm kiếm theo tên..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}

        style={{ marginRight: 12 }}
      />


      <select value={sortOrder}
        onChange={e => setSortOrder(e.target.value)}
      >
        <option value="">— Không sắp xếp —</option>
        <option value="asc">Giá: Thấp → Cao</option>
        <option value="desc">Giá: Cao → Thấp</option>
      </select>


      <button
        onClick={() => {
          setSearchTerm("")
          setSortOrder("")
        }}
        style={{ marginLeft: 12 }}
      >
        Reset
      </button>


      <ul style={{ marginTop: 20 }}>
        {displayed.map(p => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <strong>{p.title}</strong> — Giá: ${p.price} — Loại: {p.category}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
