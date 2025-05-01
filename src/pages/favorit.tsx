import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Favorit() {

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
    <section class="mx-8 md:mx-10">
      <div class="pt-20 h-[20vh] flex flex-col">
        <div class="w-full h-full items-center flex">
          <div class="w-full flex text-left">
            <h2 class="text-2xl font-medium">Favorit</h2>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-row border-b border-gray-600 mb-4 py-4 text-sm">
        <div class="w-1/2">
          <p class="text-lg font-medium">Produk(7)</p>
        </div>
        <button
          class="w-1/2 flex items-center font-medium text-base lg:text-lg px-2 rounded-md justify-end"
          onClick={() => setIsOpen(!isOpen())}
        >
          {selectedOption()} <i class="fa-solid fa-chevron-down ml-2 text-lg"></i>
        </button>

        <div
          class={`absolute right-8 md:right-10 mt-12 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 transition-opacity duration-200 ${
            isOpen() ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <ul class="py-1">
            {options.map((option) => (
              <li>
                <button
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div class="w-full mb-8 gap-4 flex">
        <div class="w-full w-full">
            <div class="grid gap-4 grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4">
              <A
                href="/produk"
                  class="w-full flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                  <img
                  src="/src/public/images/mockup/9.png"
                  alt=""
                  class="h-[50vh] object-cover w-full"
                />
                <div class="p-2 text-left text-black">
                  <p class="text-md font-semibold truncate">Kaos</p>
                  <p class="text-sm">Rp 100000</p>
                </div>
              </A>
              <A
                href="/produk"
                  class="w-full flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                  <img
                  src="/src/public/images/mockup/7.png"
                  alt=""
                  class="h-[50vh] object-cover w-full"
                />
                <div class="p-2 text-left text-black">
                  <p class="text-md font-semibold truncate">Kaos</p>
                  <p class="text-sm">Rp 100000</p>
                </div>
              </A>
              <A
                href="/produk"
                  class="w-full flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                  <img
                  src="/src/public/images/mockup/11.png"
                  alt=""
                  class="h-[50vh] object-cover w-full"
                />
                <div class="p-2 text-left text-black">
                  <p class="text-md font-semibold truncate">Kaos</p>
                  <p class="text-sm">Rp 100000</p>
                </div>
              </A>
              <A
                href="/produk"
                  class="w-full flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                  <img
                  src="/src/public/images/mockup/7.png"
                  alt=""
                  class="h-[50vh] object-cover w-full"
                />
                <div class="p-2 text-left text-black">
                  <p class="text-md font-semibold truncate">Kaos</p>
                  <p class="text-sm">Rp 100000</p>
                </div>
              </A>
              <A
                href="/produk"
                  class="w-full flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                  <img
                  src="/src/public/images/mockup/11.png"
                  alt=""
                  class="h-[50vh] object-cover w-full"
                />
                <div class="p-2 text-left text-black">
                  <p class="text-md font-semibold truncate">Kaos</p>
                  <p class="text-sm">Rp 100000</p>
                </div>
              </A>
              <A
                href="/produk"
                  class="w-full flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                  <img
                  src="/src/public/images/mockup/9.png"
                  alt=""
                  class="h-[50vh] object-cover w-full"
                />
                <div class="p-2 text-left text-black">
                  <p class="text-md font-semibold truncate">Kaos</p>
                  <p class="text-sm">Rp 100000</p>
                </div>
              </A>
              <A
                href="/produk"
                  class="w-full flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                  <img
                  src="/src/public/images/mockup/11.png"
                  alt=""
                  class="h-[50vh] object-cover w-full"
                />
                <div class="p-2 text-left text-black">
                  <p class="text-md font-semibold truncate">Kaos</p>
                  <p class="text-sm">Rp 100000</p>
                </div>
              </A>
            </div>
            <div class="w-full flex mt-6 justify-center text-sm">
              <div class="block justify-center text-center">
                <p class="text-gray-400 py-2">7/100</p>
                <button class="hover:bg-gray-50 px-4 md:px-6 py-2 md:py-3 border border-gray-400 rounded">Lihat lebih banyak</button>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
