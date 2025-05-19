import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const url = "https://dummyjson.com/products";

  const [allProducts, setAllProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);

  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // 1. Fetch data khi url, limit hoặc page thay đổi
  useEffect(() => {
    const skip = (page - 1) * limit;
    fetch(`${url}?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then(data => {
        const products = data.products || [];
        setAllProducts(products);
      })
      .catch(console.error);
  }, [url, limit, page]);

  // 2. Lọc + sort khi allProducts, searchTerm, sortOrder thay đổi
  useEffect(() => {
    let filtered = allProducts;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(term)
      );
    }

    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setDisplayed(filtered);
  }, [allProducts, searchTerm, sortOrder]);

  // Hàm pagination
  const handlePrev = () => setPage(p => Math.max(p - 1, 1));
  const handleNext = () => setPage(p => p + 1);

  return (
    <div className="App">
      <h2>Danh sách sản phẩm</h2>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginRight: 12 }}
      />

      <select
        value={sortOrder}
        onChange={e => setSortOrder(e.target.value)}
      >
        <option value="">— Không sắp xếp —</option>
        <option value="asc">Giá: Thấp → Cao</option>
        <option value="desc">Giá: Cao → Thấp</option>
      </select>

      <button
        onClick={() => {
          setSearchTerm("");
          setSortOrder("");
        }}
        style={{ marginLeft: 12 }}
      >
        Reset
      </button>

      <select
        value={limit}
        onChange={e => setLimit(Number(e.target.value))}
        style={{ marginLeft: 12 }}
      >
        <option value={5}>5 / page</option>
        <option value={10}>10 / page</option>
        <option value={20}>20 / page</option>
        <option value={50}>50 / page</option>
      </select>

      <ul style={{ marginTop: 20 }}>
        {displayed.map(p => (
          <li key={p.id} style={{ marginBottom: 8 }}>
            <strong>ID: {p.id} – {p.title}</strong> — Giá: ${p.price} — Loại: {p.category}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button onClick={handlePrev} disabled={page === 1}>
          ← Trang trước
        </button>
        <span style={{ margin: '0 12px' }}>Trang {page}</span>
        <button onClick={handleNext}>
          Trang sau →
        </button>
      </div>
    </div>
  );
}

export default App;
