import Hero from "@features/home/components/Hero/Hero";

export default function HomePage() {
  // Полный вьюпорт под хедером ⇒ row-gap = 0
  return (
    <div data-gap="0">
      <Hero />
    </div>
  );
}
