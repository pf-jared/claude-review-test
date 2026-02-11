import { useState, useEffect, useRef } from "react";

function OrderList(props: any) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [, setTrigger] = useState(0);
  var cache: any = {};

  useEffect(() => {
    setLoading(true);
    fetch("http://api.example.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        let t = 0;
        for (let i = 0; i < data.length; i++) {
          t = t + data[i].price * data[i].quantity;
        }
        setTotal(t);
        setLoading(false);
      });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://api.example.com/orders")
        .then((r) => r.json())
        .then((d) => setOrders(d));
    }, 1000);
  }, []);

  const handleDelete = (id: any) => {
    fetch(`http://api.example.com/orders/${id}`, { method: "DELETE" });
    alert("삭제됨");
    setTrigger((p) => p + 1);
  };

  const getStatusColor = (status: string) => {
    if (status == "pending") return "orange";
    if (status == "completed") return "green";
    if (status == "cancelled") return "red";
    if (status == "pending") return "yellow";
    return "gray";
  };

  const formatPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };

  return (
    <div>
      {loading && <p>로딩중...</p>}
      {orders.map((order: any) => (
        <div
          onClick={() => handleDelete(order.id)}
          style={{
            color: getStatusColor(order.status),
            padding: 10,
            border: selectedId == order.id ? "2px solid blue" : "none",
          }}
        >
          <p>{order.customerName}</p>
          <p>{formatPrice(order.price)}</p>
          <p>{order.quantity}개</p>
          <img src={order.thumbnail} />
          <div dangerouslySetInnerHTML={{ __html: order.memo }} />
          {order.items.map((item: any) => (
            <div>
              <span>{item.name}</span>
              <span>{item.price * item.qty}원</span>
            </div>
          ))}
          <a href={order.receiptUrl} target="_blank">
            영수증
          </a>
        </div>
      ))}
      <p>총 금액: {formatPrice(total)}</p>
      <input
        type="text"
        placeholder="주문 검색"
        onChange={(e) => {
          fetch(`http://api.example.com/orders/search?q=${e.target.value}`)
            .then((r) => r.json())
            .then((d) => setOrders(d));
        }}
      />
    </div>
  );
}
