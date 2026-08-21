// type은 union과 객체 모양을 모두 표현할 수 있어요.
// Status는 "ready", "loading", "success", "error" 중 하나의 문자열만 가질 수 있어요.
type Status = "ready" | "loading" | "success" | "error";

// type으로 객체의 모양을 정할 수도 있어요.
type User = {
    id: string;
    name: string;
}

// &는 두 타입을 합친다는 뜻이에요.
// UserWithEmail에는 id, name, email이 모두 필요해요.
type UserWithEmail = User & {
    email: string;
}

// interface는 같은 이름으로 선언하면 내용이 합쳐질 수 있어요. 
// 그래서 Seller 인터페이스를 두 번 선언했지만, 최종적으로는 id와 shopName 속성을 모두 가지게 돼요.
interface Seller {
    id: string;
}
interface Seller {
    shopName: string;
}

const status: Status = "ready";
const user: User = { id: "1", name: "Alice" };

// Seller의 두 interface가 합쳐져서 id와 shopName이 모두 필요해요.
const seller: Seller = { id: "seller-1", shopName: "Alice's Shop" };
const userWithEmail: UserWithEmail = {
    id: "1",
    name: "Alice",
    email: "alice@example.com"
}

function printStatus(currentStatus: Status) {
    console.log(`현재 상태는 ${currentStatus} 입니다.`);
}

// type과 interface 중 하나가 항상 정답인 것은 아니에요.
// 프로젝트나 팀의 규칙에 맞춰 일관되게 사용하면 됩니다.