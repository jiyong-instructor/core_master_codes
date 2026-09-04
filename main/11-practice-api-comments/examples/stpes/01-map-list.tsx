type Travel = {
  id: string;
  name: string;
};

const travels: Travel[] = [
  { id: "travel-1", name: "제주 바다 여행" },
  { id: "travel-2", name: "부산 야경 여행" },
];

export default function MapList() {
  return (
    <ul>
      {travles.map((travel) => (
        <li key={travel.id}>{travel.name}</li>
      ))}
    </ul>
  );
}
