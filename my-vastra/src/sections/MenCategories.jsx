import CategorySelection from "../components/CategorySelection";

export default function MenCategories() {
  return (
    <CategorySelection
      title="Men"
      subcategories={[
        { name: "Sherwanis", link: "/men/sherwanis" },
        { name: "Kurtas", link: "/men/kurtas" },
        { name: "Indo-Western", link: "/men/indo-western" },
        { name: "Bandhgalas", link: "/men/bandhgalas" },
        { name: "Jackets", link: "/men/jackets" },
      ]}
    />
  );
}
