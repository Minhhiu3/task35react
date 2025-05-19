import React, { useEffect, useState } from 'react'
import './App.css'
import { preview } from 'vite'

function App() {
  const url = "https://dummyjson.com/products"

  // State gốc và state hiển thị
  const [allProducts, setAllProducts] = useState([])
  const [displayed, setDisplayed] = useState([])
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  // Các state tìm kiếm + sắp xếp
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("")




  // Fetch data 
  useEffect(() => {
    let skip = (page - 1) * limit;
    fetch(`${url}?limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data.products || [])
        setDisplayed(data.products || [])

      })
      .catch(err => console.error(err))
  }, [url, limit])


  //   searchTerm hoặc sortOrder thay đổi,
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

    // -- chỉnh sửa limit
    if (setLimit === "") {
      console.log("Chưa chọn");

    } else if (setLimit === '5') {
      setDisplayed(`${url}?limit=${setLimit}`)
    } else if (setLimit === '10') {
      setDisplayed(`${url}?limit=${setLimit}`)
    } else if (setLimit === '20') {
      setDisplayed(`${url}?limit=${setLimit}`)
    } else if (setLimit === '50') {
      setDisplayed(`${url}?limit=${setLimit}`)
    }
    console.log(`${url}?limit${limit}`);

    //-- paginate
    const handleLoadLeft = () => {
      //
      setPage(preview => preview + 1)
    }
    const handleLoadRight = () => {
      //
      setPage(preview => preview - 1)
    }
    setDisplayed(filtered);
  }, [allProducts, limit, searchTerm, sortOrder])


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

      <select value={setLimit}
        onChange={e => setLimit(e.target.value)}
        style={{ marginLeft: 12 }} id="editLimit">
        <option value="">Limit/page</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>


      <ul style={{ marginTop: 20 }}>
        {displayed.map(p => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <strong>ID: ${p.id} - TITLE: {p.title}</strong> — Giá: ${p.price} — Loại: {p.category}
          </li>
        ))}
      </ul>
      <button onClick={handleLoadLeft}>left</button> <span>${page}</span> <button onClick={handleLoadRight}>right</button>
    </div>
  )
}

export default App
