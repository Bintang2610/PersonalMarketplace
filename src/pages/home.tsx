import { createSignal, onMount } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Home() {
  const [count, setCount] = createSignal(0);

  let revealDiv: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && revealDiv) {
            revealDiv.classList.remove('opacity-0', 'translate-y-10');
            revealDiv.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target); // Berhenti observe setelah muncul
          }
        });
      },
      { threshold: 0.4 }
    );

    if (revealDiv) observer.observe(revealDiv);
  });

  const [scrollX, setScrollX] = createSignal(0);
  let containerRef;

  const scrollNext = () => {
    if (containerRef) {
      containerRef.scrollBy({ left: 195, behavior: 'smooth' }); // 195 + gap
    }
  };

  const scrollPrev = () => {
    if (containerRef) {
      containerRef.scrollBy({ left: -195, behavior: 'smooth' });
    }
  };

  const products = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Hoodie ${i + 1}`,
    price: `Rp ${200000 + i * 10000}`,
    img: `/src/public/images/mockup/${(i % 4) + 1}.png`
  }));

  return (
    <section class="mx-8 mt-20">
    <A href=""
      class="relative w-full h-[100vh] bg-cover bg-center md:bg-top flex items-center group"
      style="background-image: url('/src/public/images/mockup/13.png');"
    >
      <div class="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0"></div>

      <div class="w-full max-w-sm md:max-w-sm lg:max-w-md ml-10 md:ml-20 lg:ml-32 p-4 rounded text-white font-medium">
        <h2 class="w-full mb-1 text-3xl lg:text-4xl font-medium lg:font-semibold">Hoodie terbaru dari Personal Store</h2>
        <p class="mb-2 text-md">Hoodie 1.1</p>
        <A href="/" class=" text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div class="flex items-center w-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full"><i class="fa-solid fa-bag-shopping mr-1"></i> Shop</div>
        </A>
      </div>
    </A>
    <div
      class="relative w-full h-[655px] py-20 flex justify-center items-center"
    >
      <div class="w-full flex flex-col justify-center p-4 text-black">
        <h2 class="mb-6 text-3xl lg:text-4xl font-medium lg:font-semibold">
          Terbaru di Personal Store
        </h2>

        <div ref={revealDiv} class="opacity-0 translate-y-10 transition-all duration-700 overflow-x-auto w-full flex-1">
          <div class="relative w-full">
            <button
              onClick={scrollPrev}
              class="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white p-2"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div
              ref={el => (containerRef = el)}
              class="overflow-x-hidden"
            >
              <div class="flex space-x-5 w-fit">
                {products.map(product => (
                  <a
                    href="/"
                    class="w-[195px] flex-shrink-0 flex flex-col overflow-hidden bg-white"
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      class="w-full h-[240px] object-cover border"
                    />
                    <div class="p-2 text-left text-black">
                      <p class="text-md font-semibold">{product.title}</p>
                      <p class="text-sm">{product.price}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollNext}
              class="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white p-2"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <A
          href="/"
          class="text-sm mt-4"
        >
          <div class="flex items-center w-fit text-black rounded-full">
            <p class="hover:underline">Lihat selengkapnya</p>
            <i class="fa-solid fa-chevron-right ml-1"></i>
          </div>
        </A>
      </div>
    </div>
  </section>

  );
}
