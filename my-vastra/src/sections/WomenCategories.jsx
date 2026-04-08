import CategorySelection from "../components/CategorySelection";

export default function WomenCategories() {
  return (
    <CategorySelection
      title="Women"
      bannerImg="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8"
      subcategories={[
        { name: "Sarees", link: "/women/sarees" },
        { name: "Lehengas", link: "/women/lehengas" },
        { name: "Gowns", link: "/women/gowns" },
        { name: "Kurtis", link: "/women/kurtis" },
        { name: "Bridal", link: "/women/bridal" },
      ]}
      products={Array.from({ length: 15 }).map((_, i) => ({
        name: "Designer Couture",
        price: "₹" + (10999 + i * 700),
        img: `https://source.unsplash.com/600x800/?indian,women,ethnic,fashion&sig=${i}`,
      }))}
    />
  );
}
