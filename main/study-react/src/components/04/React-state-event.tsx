import { ChangeEvent, MouseEvent, useState } from "react";

type FormData = {
    title: string;
    price: number;
    location: string;
}

export default function ReactTypeExample() {

    const [formData, setFormData] = useState<FormData>({
        title: "",
        price: 0,
        location: "제주"
    });
    const [message, setMessage] = useState<string>("");

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData, // 원래 formData의 값들을 그대로 가져오고, title만 바꿔요.
            title: event.target.value
        });
    }

    function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            price: Number(event.target.value)
        });
    }

    function handleLocationChange(event: ChangeEvent<HTMLSelectElement>) {
        setFormData({
            ...formData,
            location: event.target.value
        });
    }

    function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
        // currentTarget은 이벤트가 연결된 button을 가리켜요.
        console.log(event.currentTarget.name, formData);
        setMessage(`${formData.location} 여행을 등록할 준비가 되었습니다.`);
    }


    return (<main>
            <h1>여행 등록</h1>

            <label htmlFor="title">여행 이름</label>
            <input id="title" value={formData.title} onChange={handleTitleChange} />

            <label htmlFor="price">가격</label>
            <input id="price" type="number" value={formData.price} onChange={handlePriceChange} />

            <label htmlFor="location">여행지</label>
            <select id="location" value={formData.location} onChange={handleLocationChange}>
                <option value="제주">제주</option>
                <option value="부산">부산</option>
                <option value="강릉">강릉</option>
            </select>

            <p>미리보기: {formData.title || "여행 이름 없음"}</p>
            <p>가격: {formData.price.toLocaleString()}원</p>

            <button
                name="submitButton"
                onClick={handleSubmit}
                disabled={formData.title === "" || formData.price <= 0}
            >
                등록
            </button>

            {message && <p>{message}</p>}
    </main>)
}