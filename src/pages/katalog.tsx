import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function About() {

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

  const [showDropdown, setShowDropdown] = createSignal(false);
  const [searchText, setSearchText] = createSignal('');
  let containerRef;
  let inputRef;

  const handleFocus = () => setShowDropdown(true);

  const handleClickOutside = (e) => {
    if (containerRef && !containerRef.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleScroll = () => {
    if (containerRef) {
      const rect = containerRef.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) {
        setShowDropdown(false);
        // Blur input
        const input = document.getElementById("searchInput");
        if (input) input.blur();
      }
    }
  };  
  
  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
  
    onCleanup(() => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    });
  });

  document.addEventListener('click', handleClickOutside);
  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  const closeInput = () => {
    setShowDropdown(false);
    inputRef.blur(); // hilangkan fokus input
  };

  const [scrollX, setScrollX] = createSignal(0);
  let containerRef2;

  const scrollNext = () => {
    if (containerRef2) {
      containerRef2.scrollBy({ left: 195, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (containerRef2) {
      containerRef2.scrollBy({ left: -195, behavior: 'smooth' });
    }
  };

  const products = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    title: `Hoodie ${i + 1}`,
    price: `Rp ${200000 + i * 10000}`,
    img: `/src/public/images/mockup/${(i % 4) + 1}.png`
  }));

  const [sidebarOpen, setSidebarOpen] = createSignal(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen());
  };

  const [isScrollingUp, setIsScrollingUp] = createSignal(false);
  let lastScrollTop = 0;

  onMount(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll < lastScrollTop) {
        setIsScrollingUp(true); // Scroll ke atas
      } else {
        setIsScrollingUp(false); // Scroll ke bawah
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Untuk antisipasi scroll ke atas mentok
    };

    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  const [showDD1, setShowDD1] = createSignal(false);

  const [showDD2, setShowDD2] = createSignal(false);

  const [showDD3, setShowDD3] = createSignal(false);

  const [showDD4, setShowDD4] = createSignal(false);

  return (
    <section class="mx-8 md:mx-10">
      <div class="pt-20 pb-6 h-[100vh] flex flex-col">
      <div class="w-full mb-4 relative" ref={el => (containerRef = el)}>
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>

      <input
        type="text"
        placeholder="Cari produk..."
        value={searchText()}
        id="searchInput"
        ref={inputRef}
        onInput={(e) => setSearchText(e.target.value)}
        onFocus={handleFocus}
        class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Tombol X: muncul hanya saat showDropdown true */}
      {showDropdown() && (
        <button
          class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-black"
          onClick={closeInput}
          type="button"
        >
          <i class="fa-solid fa-xmark mr-1"></i>
        </button>
      )}

      {/* Dropdown muncul saat fokus */}
      {showDropdown() && (
        <div class="absolute top-full flex flex-col md:flex-row h-[70vh] md:h-[50vh] left-0 w-full p-10 mt-1 bg-white shadow-md border border-gray-200 rounded-xl z-10">
          <div class="flex-1 md:w-1/3 py-0 pb-4 md:pb-0 md:py-2">
          <p class="text-md font-medium text-black mb-2">Pencarian teratas</p>
            <ul>
              <li>
                <A href="" class="text-gray-600 hover:text-gray-500">Hoodie</A>
              </li>
              <li>
                <A href="" class="text-gray-600 hover:text-gray-500">Kaos</A>
              </li>
              <li>
                <A href="" class="text-gray-600 hover:text-gray-500">Sepatu</A>
              </li>
            </ul>
          </div>
          <div class="relative md:w-2/3 h-full overflow-x-auto flex-2">
          <button
              onClick={scrollPrev}
              class="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white p-2"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="overflow-x-hidden" ref={el => (containerRef2 = el)}>
              <div class="flex flex-row space-x-3">
                {products.map(product => (
                  <A
                    href="/"
                    class="w-[183px] flex-shrink-0 flex flex-col bg-white rounded border"
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      class="h-[160px] object-cover w-full"
                    />
                    <div class="p-2 text-left text-black">
                      <p class="text-md font-semibold truncate">{product.title}</p>
                      <p class="text-sm">{product.price}</p>
                    </div>
                  </A>
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
      )}
    </div>
      <A href=""
            class="relative w-full flex-1 bg-cover bg-center md:bg-top flex items-center group"
            style="background-image: url('/src/public/images/mockup/13.png');"
          >
            <div class="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0"></div>
      
            <div ref={revealDiv1} class="opacity-0 translate-x-0 transition-all duration-700 overflow-x-auto w-full max-w-sm md:max-w-sm lg:max-w-md ml-2 md:ml-16 lg:ml-32 rounded text-white font-medium">
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
      <div class="w-full flex flex-row border-b border-gray-600 mb-4 py-4 text-sm">
        <div class="md:w-1/4 flex gap-3 items-center font-medium text-lg rounded-md pl-0 md:pl-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen())} class="md:block hidden text-left flex items-center font-medium text-lg rounded-md"><i class="fa-solid fa-bars-staggered mr-1"></i> Filter</button>
          <span class={`hidden ${sidebarOpen() ? 'md:hidden' : 'md:block'}`}>Produk(100)</span>
        </div>
        <div class="w-1/2 md:w-2/4 flex gap-3 items-center font-medium text-lg px-2 rounded-md pl-0 md:pl-4">
          <button class="md:hidden block text-left flex items-center font-medium text-lg px-2 rounded-md"><i class="fa-solid fa-bars-staggered mr-1"></i> Filter</button>
          <span class={`${sidebarOpen() ? 'md:block' : 'md:hidden'}`}>Produk(100)</span>
        </div>
        <button class="w-1/2 md:w-1/4 flex items-center font-medium text-lg px-2 rounded-md justify-end">Urutkan <i class="fa-solid fa-chevron-down ml-1"></i></button>
      </div>
      <div class="w-full mb-8 gap-4 flex">
        {sidebarOpen() && (
          <div class="w-1/3 lg:w-1/4 hidden md:block bg-gray-100 p-4">
            <div class={`h-[90vh] sticky ${isScrollingUp() ? 'top-20' : 'top-4'} overflow-y-auto`}>
              <p class="font-medium text-md border-b border-gray-800 pb-2">Filter</p>
              <div class="w-full flex flex-wrap text-sm py-4 gap-2 border-gray-800 border-b">
                <p class="px-3 py-2 bg-gray-600 text-white items-center rounded-full">Sepatu<i class="fa-solid fa-xmark ml-2 cursor-pointer"></i></p>
                <p class="px-3 py-2 bg-gray-600 text-white items-center rounded-full">Hoodie<i class="fa-solid fa-xmark ml-2 cursor-pointer"></i></p>
                <p class="px-3 py-2 bg-gray-600 text-white items-center rounded-full">Kaos<i class="fa-solid fa-xmark ml-2 cursor-pointer"></i></p>
                <p class="px-3 py-2 bg-gray-600 text-white items-center rounded-full">Pria<i class="fa-solid fa-xmark ml-2 cursor-pointer"></i></p>
              </div>
              <div class="w-full flex-col border-gray-800 border-b pr-2">
                <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD1(!showDD1())}>
                  <p class="flex items-center text-md font-medium py-4">
                    Gender
                  </p>
                  <i
                    class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                      showDD1() ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
                <ul class={`${showDD1() ? "block" : "hidden"} space-y-3 pl-1 pb-4 transition-opacity duration-300`}>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                        Pria
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                        Wanita
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                        Unisex
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="w-full flex-col border-gray-800 border-b pr-2">
                <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD2(!showDD2())}>
                  <p class="flex items-center text-md font-medium py-4">
                    Kategori
                  </p>
                  <i
                    class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                      showDD2() ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
                <ul class={`${showDD2() ? "block" : "hidden"} space-y-3 pl-1 pb-4 transition-opacity duration-300`}>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                        Hoodie
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                        Kaos
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                        Celana
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="w-full flex-col border-gray-800 border-b pr-2">
                <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD3(!showDD3())}>
                  <p class="flex items-center text-md font-medium py-4">
                  Kisaran harga
                  </p>
                  <i
                    class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                      showDD3() ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
                <ul class={`${showDD3() ? "block" : "hidden"} space-y-3 pl-1 pb-4 transition-opacity duration-300`}>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                      Rp 0 - Rp 250.000
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                      Rp 250.000 - Rp 500.000
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                      Rp 500.000 ++
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="w-full flex-col border-gray-800 border-b pr-2">
                <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD4(!showDD4())}>
                  <p class="flex items-center text-md font-medium py-4">
                    Warna
                  </p>
                  <i
                    class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                      showDD4() ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>
                <ul class={`${showDD4() ? "block" : "hidden"} space-y-3 pl-1 pb-4 transition-opacity duration-300`}>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                        Hitam
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                      Putih
                      </label>
                    </div>
                  </li>
                  <li>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" class="w-4 h-4 cursor-pointer" />
                      <label for="pria" class="hover:text-gray-500 text-gray-700">
                      Krem
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <div class={`${sidebarOpen() ? 'w-full md:w-2/3 lg:w-3/4' : 'w-full'}`}>
            <div class={`grid gap-4 grid-cols-2
            ${sidebarOpen() ? 'w-full md:grid-cols-2 lg:grid-cols-3' : 'w-full md:grid-cols-3 lg:grid-cols-4'}`}>
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
