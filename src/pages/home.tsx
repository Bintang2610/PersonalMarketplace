import { createSignal, onMount } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Home() {

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

  let revealDiv2: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && revealDiv2) {
            revealDiv2.classList.remove('opacity-0', 'translate-y-10');
            revealDiv2.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target); // Berhenti observe setelah muncul
          }
        });
      },
      { threshold: 0.4 }
    );

    if (revealDiv2) observer.observe(revealDiv2);
  });

  let revealDiv3: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && revealDiv3) {
            revealDiv3.classList.remove('opacity-0', 'translate-x-0');
            revealDiv3.classList.add('opacity-100', 'translate-x-10');
            observer.unobserve(entry.target); // Berhenti observe setelah muncul
          }
        });
      },
      { threshold: 0.4 }
    );

    if (revealDiv3) observer.observe(revealDiv3);
  });

  let revealSec1: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && revealSec1) {
            revealSec1.classList.remove('opacity-0', 'translate-x-0');
            revealSec1.classList.add('opacity-100', 'translate-x-10');
            observer.unobserve(entry.target); // stop observing after reveal
          }
        });
      },
      { threshold: 0.8 }
    );

    if (revealSec1) observer.observe(revealSec1);
  });

  let revealSec2: HTMLDivElement | undefined;

  onMount(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && revealSec2) {
            revealSec2.classList.remove('opacity-0', 'translate-x-0');
            revealSec2.classList.add('opacity-100', 'translate-x-10');
            observer.unobserve(entry.target); // stop observing after reveal
          }
        });
      },
      { threshold: 0.6 }
    );

    if (revealSec2) observer.observe(revealSec2);
  });

  const [scrollX, setScrollX] = createSignal(0);
  let containerRef;

  const scrollNext = () => {
    if (containerRef) {
      containerRef.scrollBy({ left: 215, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (containerRef) {
      containerRef.scrollBy({ left: -215, behavior: 'smooth' });
    }
  };

  const products = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Hoodie ${i + 1}`,
    price: `Rp ${200000 + i * 10000}`,
    img: `/src/public/images/mockup/${(i % 4) + 1}.png`
  }));

  const [scrollX2, setScrollX2] = createSignal(0);
  let containerRef2;

  const scrollNext2 = () => {
    if (containerRef2) {
      containerRef2.scrollBy({ left: 215, behavior: 'smooth' });
    }
  };

  const scrollPrev2 = () => {
    if (containerRef2) {
      containerRef2.scrollBy({ left: -215, behavior: 'smooth' });
    }
  };

  const products2 = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Hoodie ${i + 1}`,
    price: `Rp ${200000 + i * 10000}`,
    img: `/src/public/images/mockup/${(i % 4) + 1}.png`
  }));

  return (
    <section class="mx-8 md:mx-10">
    <div class="pt-20 pb-6 h-[100vh] flex flex-col">
      <A href="/produk"
        class="relative w-full flex-1 bg-cover bg-center md:bg-top flex items-center group"
        style="background-image: url('/src/public/images/mockup/13.png');"
      >
        <div class="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0"></div>

        <div ref={revealDiv3} class="opacity-0 translate-x-0 transition-all duration-700 overflow-x-auto w-full max-w-sm md:max-w-sm lg:max-w-md ml-2 md:ml-16 lg:ml-32 rounded text-white font-medium">
          <h2 class="w-full mb-1 text-3xl lg:text-4xl font-medium lg:font-semibold">Hoodie terbaru dari Personal Store</h2>
          <p class="mb-2 text-md">Hoodie 1.1</p>
          <A href="/" class=" text-sm block md:hidden">
            <div class="flex items-center w-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full"><i class="fa-solid fa-bag-shopping mr-1"></i> Shop</div>
          </A>
          <A href="/" class=" text-sm hidden md:block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div class="flex items-center w-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full"><i class="fa-solid fa-bag-shopping mr-1"></i> Shop</div>
          </A>
        </div>
      </A>
    </div>
    <div
      class="relative w-full h-[90vh] flex justify-center items-center"
    >
      <div class="w-full flex flex-col justify-center p-4 text-black">
        <h2 class="mb-6 text-xl lg:text-2xl font-medium lg:font-semibold">
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
    <A href=""
      class="relative w-full h-[90vh] mb-12 bg-cover bg-center md:bg-top text-center justify-center flex items-center group"
      style="background-image: url('/src/public/images/mockup/10.png');"
    >
      <div class="absolute z-0 inset-0 bg-black/15"></div>

      <div class="w-full z-10 max-w-sm md:max-w-sm lg:max-w-md p-4 rounded text-white font-medium">
        <h2 class="w-full mb-2 text-3xl lg:text-4xl font-medium lg:font-semibold">Cari hoodie favoritmu di Personal Store</h2>
          <div class="hidden md:block">
            <A href="/" class="text-sm justify-center text-center flex transition-opacity opacity-0 duration-300 group-hover:opacity-100">
              <div class="flex items-center px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Kunjungi laman <i class="fa-solid fa-arrow-right ml-2"></i></div>
            </A>
          </div>
          <div class="block md:hidden">
            <A href="/" class="text-sm justify-center text-center flex">
              <div class="flex items-center px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Kunjungi laman <i class="fa-solid fa-arrow-right ml-2"></i></div>
            </A>
          </div>
      </div>
    </A>
    <div class="flex mb-12">
      <A href=""
        class="relative w-1/2 h-[90vh] bg-cover bg-center md:bg-top flex items-end group"
        style="background-image: url('/src/public/images/mockup/9.png');"
      >
        <div class="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:opacity-0"></div>

        <div ref={revealSec1} class="transition-all duration-700 ease-out transform opacity-0 translate-x-0 w-full max-w-[110px] md:max-w-sm lg:max-w-md ml-none md:ml-8 lg:ml-16 py-4 rounded text-white font-medium">
          <h2 class="w-full text-shadow-lg mb-2 text-3xl lg:text-4xl font-medium lg:font-semibold">Pilihan Pria</h2>
          <A href="/" class="text-sm hidden md:block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div class="flex items-center w-40 text-center justify-center mb-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Kunjungi laman <i class="fa-solid fa-arrow-right ml-2"></i></div>
          </A>
          <A href="/" class="text-sm block md:hidden">
            <div class="flex items-center w-20 text-center justify-center mb-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Lihat <i class="fa-solid fa-arrow-right ml-2"></i></div>
          </A>
        </div>
      </A>
      <A href=""
        class="relative w-1/2 h-[90vh] bg-cover bg-center md:bg-top flex items-start group"
        style="background-image: url('/src/public/images/mockup/11.png');"
      >
        <div class="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:opacity-0"></div>

        <div ref={revealSec2} class="transition-all duration-700 ease-out transform opacity-0 translate-x-0 w-full max-w-[110px] md:max-w-sm lg:max-w-md ml-none md:ml-8 lg:ml-16 py-4 rounded text-white font-medium">
          <h2 class="w-full text-shadow-lg mt-20 mb-2 text-3xl lg:text-4xl font-medium lg:font-semibold">Pilihan Wanita</h2>
          <A href="/" class="text-sm hidden md:block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div class="flex items-center w-40 text-center justify-center mb-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Kunjungi laman <i class="fa-solid fa-arrow-right ml-2"></i></div>
          </A>
          <A href="/" class="text-sm block md:hidden">
            <div class="flex items-center w-20 text-center justify-center mb-20 px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Lihat <i class="fa-solid fa-arrow-right ml-2"></i></div>
          </A>
        </div>
      </A>
    </div>
    <A href=""
      class="relative w-full h-[60vh] bg-cover bg-center md:bg-top text-center justify-center flex items-center group"
      style="background-image: url('/src/public/images/mockup/11.png'); background-position: center 30%;"
    >
      <div class="absolute z-0 inset-0 bg-black/15"></div>

      <div class="w-full z-10 max-w-sm md:max-w-sm lg:max-w-md p-4 rounded text-white font-medium">
        <h2 class="w-full mb-3 text-3xl lg:text-4xl font-medium lg:font-semibold">Kenali gaya yang cocok dengan kamu</h2>
          <div class="hidden md:block">
            <A href="/" class="text-sm justify-center text-center flex transition-opacity opacity-0 duration-300 group-hover:opacity-100">
              <div class="flex items-center px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Kunjungi laman <i class="fa-solid fa-arrow-right ml-2"></i></div>
            </A>
          </div>
          <div class="block md:hidden">
            <A href="/" class="text-sm justify-center text-center flex">
              <div class="flex items-center px-4 py-2 text-black hover:bg-gray-100 bg-white rounded-full">Kunjungi laman <i class="fa-solid fa-arrow-right ml-2"></i></div>
            </A>
          </div>
      </div>
    </A>
    <div
      class="relative w-full h-[90vh] flex justify-center items-center"
    >
      <div class="w-full flex flex-col justify-center p-4 text-black">
        <h2 class="mb-6 text-xl lg:text-2xl font-medium lg:font-semibold">
          Populer di Personal Store
        </h2>

        <div ref={revealDiv2} class="opacity-0 translate-y-10 transition-all duration-700 overflow-x-auto w-full flex-1">
          <div class="relative w-full">
            <button
              onClick={scrollPrev2}
              class="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white p-2"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div
              ref={el => (containerRef2 = el)}
              class="overflow-x-hidden"
            >
              <div class="flex space-x-5 w-fit">
                {products2.map(product2 => (
                  <a
                    href="/"
                    class="w-[195px] flex-shrink-0 flex flex-col overflow-hidden bg-white"
                  >
                    <img
                      src={product2.img}
                      alt={product2.title}
                      class="w-full h-[240px] object-cover border"
                    />
                    <div class="p-2 text-left text-black">
                      <p class="text-md font-semibold">{product2.title}</p>
                      <p class="text-sm">{product2.price}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={scrollNext2}
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
