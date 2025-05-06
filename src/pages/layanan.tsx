import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Layanan() {

let revealDiv1: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && revealDiv1) {
            revealDiv1.classList.remove('opacity-0', 'translate-x-0');
            revealDiv1.classList.add('opacity-100', 'translate-x-10');
            observer.unobserve(entry.target); // Berhenti observe setelah muncul
          }
        });
      },
      { threshold: 0.4 }
    );

    if (revealDiv1) observer.observe(revealDiv1);
  });

  const [selectedOption, setSelectedOption] = createSignal("Urutkan");
  const [isOpen, setIsOpen] = createSignal(false);

  const options = ["Terbaru", "Terlama", "Nama: A - Z", "Nama: Z - A", "Harga: Rendah - Tinggi", "Harga: Tinggi - Rendah"];

  return (
    <section>
      <div class="w-full h-[90vh] mt-16 bg-gray-200"></div>
    </section>
  );
}
