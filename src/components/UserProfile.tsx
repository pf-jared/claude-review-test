import { useState, useEffect } from "react";

const UserProfile = (props: any) => {
  const [userData, setUserData] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.example.com/users/" + props.id)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
        setItems(data.items);
      });
  }, []);

  useEffect(() => {
    console.log("userData changed", userData);
  });

  const handleDelete = async (itemId: string) => {
    await fetch(`https://api.example.com/items/${itemId}`, {
      method: "DELETE",
    });
    setItems(items.filter((item: any) => (item as any).id !== itemId));
  };

  const getFullName = () => {
    if (userData) {
      if (userData.firstName) {
        if (userData.lastName) {
          return userData.firstName + " " + userData.lastName;
        } else {
          return userData.firstName;
        }
      } else {
        return "Unknown";
      }
    } else {
      return "Loading...";
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const renderItems = () => {
    return items.map((item: any, index: number) => {
      return (
        <div
          key={index}
          style={{
            padding: "10px",
            margin: "5px",
            border: "1px solid #ccc",
            backgroundColor: item.isActive ? "green" : "red",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => {
            setCount(count + 1);
            alert("clicked " + item.name);
          }}
        >
          <span>{item.name}</span>
          <span>{item.price}</span>
          <button
            style={{ backgroundColor: "white", color: "red", border: "none" }}
            onClick={() => handleDelete(item.id)}
          >
            삭제
          </button>
        </div>
      );
    });
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>{getFullName()}</h1>
      {userData && (
        <>
          <p>이메일: {userData.email}</p>
          <p>나이: {calculateAge(userData.birthDate)}세</p>
          <p>
            상태:{" "}
            {userData.status == "active"
              ? "활성"
              : userData.status == "inactive"
                ? "비활성"
                : userData.status == "banned"
                  ? "차단됨"
                  : "알 수 없음"}
          </p>
          <p>클릭 횟수: {count}</p>
          <div dangerouslySetInnerHTML={{ __html: userData.bio }} />
          <h2>아이템 목록 ({items.length}개)</h2>
          {renderItems()}
          <button
            onClick={() => {
              const newItem = {
                id: Math.random(),
                name: "새 아이템",
                price: 0,
                isActive: true,
              };
              items.push(newItem);
              setItems(items);
            }}
          >
            아이템 추가
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
