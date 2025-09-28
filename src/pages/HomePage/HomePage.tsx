import Hero from "@features/home/components/Hero/Hero";

export default function HomePage() {
  // убрали вложенный <main>, чтобы не плодить второй <main> и не ломать проценты
  return <Hero />;
}
