import { useState } from "react"

const inventoryData = [
  {
    id: "JA0101",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "飲",
    name: "精製-3N",
    unit: "ML",
    stockQty: 5,
    countQty: 5.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0102",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-4N",
    unit: "ML",
    stockQty: 100,
    countQty: 100.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0103",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-4VR",
    unit: "ML",
    stockQty: 1,
    countQty: 1.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0104",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-6NGC+",
    unit: "ML",
    stockQty: 1,
    countQty: 1.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0105",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-5N",
    unit: "ML",
    stockQty: 180,
    countQty: 180.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0106",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-5BCR+",
    unit: "ML",
    stockQty: 48,
    countQty: 48.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0107",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-5RM",
    unit: "ML",
    stockQty: 148,
    countQty: 148.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0108",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-6B",
    unit: "ML",
    stockQty: 28,
    countQty: 28.0,
    status: "已盤點",
    notes: "",
  },
  {
    id: "JA0109",
    date: "2025/05/31",
    area: "北三區",
    store: "新店中正",
    category: "餐",
    name: "精製-6FR",
    unit: "ML",
    stockQty: 148,
    countQty: 148.0,
    status: "已盤點",
    notes: "",
  },
]



export default function InventoryTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [test, setTest] = useState("")

  const filteredData = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const statusClass = status === "已盤點" ? "status-completed" : "status-pending"
    return <span className={`badge ${statusClass}`}>✓ {status}</span>
  }

  const brandSelect = (brand: string) => {
      
  }

  const getCategoryBadge = (category: string) => {
    const categoryClasses = {
      餐: "category-food",
      飲: "category-drink",
      用: "category-supplies",
    }

    return (
      <span className={`badge ${categoryClasses[category as keyof typeof categoryClasses] || "category-default"}`}>
        {category}
      </span>
    )
  }

  return (
    <div className="inventory-container hover-target">
      {/* 側邊欄 */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="store-info">
            <div className="store-area">🏢 北三區</div>
            <div className="store-name">新店中正</div>
            <div className="store-code">JA2010</div>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <select className="sidebar-select" onChange={(e) => brandSelect(e.target.value)}>
              <option value="一般店">一般店</option>
              <option value="精剪達人">精剪達人</option>
            </select>
          </div>
          <div className="page-buttons">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                第 {page.toString().padStart(2, "0")} 頁
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 主要內容區域 */}
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <h1 className="title">📦 庫存盤點管理</h1>
            <div className="subtitle">📅 2025/05/31 📍 北三區 - 新店中正</div>
          </div>
          <div className="header-actions">
            <button className="btn btn-danger">關除批貨據點</button>
            <button className="btn btn-primary">確認期末</button>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 搜尋產品名稱或編號..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn btn-outline">🔽 篩選</button>
            <button className="btn btn-outline">📥 匯出</button>
          </div>
        </div>

        <div className="table-container">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">庫存明細</h2>
              <p className="card-description">
                顯示 {filteredData.length} 項產品，共 {inventoryData.length} 項
              </p>
            </div>

            <div className="table-wrapper">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>產品資訊</th>
                    <th>類別</th>
                    <th>庫存數量</th>
                    <th>盤點數量</th>
                    <th>差異</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => {
                    const difference = item.countQty - item.stockQty
                    return (
                      <tr key={item.id} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                        <td>
                          <div className="product-info">
                            <div className="product-name">{item.name}</div>
                            <div className="product-details">
                              <span className="product-id">{item.id}</span>
                              <span className="product-unit">{item.unit}</span>
                            </div>
                          </div>
                        </td>
                        <td>{getCategoryBadge(item.category)}</td>
                        <td className="text-center">
                          <span className="quantity-badge stock-qty">{item.stockQty}</span>
                        </td>
                        <td className="text-center">
                          <span className="quantity-badge count-qty">{item.countQty}</span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`quantity-badge difference ${
                              difference === 0 ? "diff-zero" : difference > 0 ? "diff-positive" : "diff-negative"
                            }`}
                          >
                            {difference > 0 ? "+" : ""}
                            {difference}
                          </span>
                        </td>
                        <td>{getStatusBadge(item.status)}</td>
                        <td className="text-center">
                          <button className="btn btn-delete">🗑️</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="summary">
                總計：庫存 {inventoryData.reduce((sum, item) => sum + item.stockQty, 0)} 單位， 盤點{" "}
                {inventoryData.reduce((sum, item) => sum + item.countQty, 0)} 單位
              </div>
              <div className="pagination">
                <button className="btn btn-outline" disabled>
                  上一頁
                </button>
                <span className="page-info">第 1 頁，共 1 頁</span>
                <button className="btn btn-outline" disabled>
                  下一頁
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
