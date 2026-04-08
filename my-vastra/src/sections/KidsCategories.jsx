import CategorySelection from "../components/CategorySelection";

export default function KidsCategories() {
  return (
    <CategorySelection
      title="Kids"
      bannerImg="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
      subcategories={[
        { name: "Boys Ethnic", link: "/kids/boys" },
        { name: "Girls Ethnic", link: "/kids/girls" },
        { name: "Wedding Kids", link: "/kids/wedding" },
        { name: "Festive Kids", link: "/kids/festive" },
      ]}
      products={Array.from({ length: 15 }).map((_, i) => ({
        name: "Festive Kids Wear",
        price: "₹" + (3999 + i * 300),
        img: `https://source.unsplash.com/600x800/?kids,ethnic,fashion&sig=${i}`,
      }))}
    />
  );
}
