import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

export default function Keranjang() {

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

  const [quantity, setQuantity] = createSignal(1);

  const increase = () => setQuantity(quantity() + 1);
  const decrease = () => {
    if (quantity() > 1) {
      setQuantity(quantity() - 1);
    }
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

  return (
    <section class="mx-8 md:mx-10 flex flex-row">
      <div class="w-full h-full md:w-3/5 lg:w-2/3 md:mr-4">
        <div class="pt-20 h-[20vh] flex flex-col">
          <div class="w-full h-full items-center flex">
            <div class="w-full flex text-left">
              <h2 class="text-2xl font-medium">Keranjang</h2>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-row border-b border-gray-600 mb-4 py-4 text-sm">
          <div class="w-full">
            <p class="text-lg font-medium">Produk(7)</p>
          </div>
        </div>
        <div class="w-full mb-8 gap-4 flex">
          <div class="w-full w-full">
              <div class="w-full h-full space-y-4 mb-10">
                <div class="w-full flex flex-col bg-white rounded border">
                    <div class="w-full flex flex-row h-[30vh]">
                      <img
                        src="/src/public/images/mockup/9.png"
                        alt=""
                        class="object-cover w-1/3 lg:w-1/4"
                      />
                      <div class="w-2/3 lg:w-3/4 p-4 flex-col space-y-1 text-left text-black">
                        <div class="w-full flex flex-row justify-between items-center">
                          <p class="text-lg font-semibold truncate">Hoodie 1.1</p>
                          <p>Stok: 10</p>
                        </div>
                        <p class="text-sm max-w-[160px] lg:max-w-xs line-clamp-2 text-gray-600">Produk ini adalah hoodie keluaran terbaru dari Personal Store yang dirilis tahun 2090 di Summer Vation Paris 2090.</p>
                        <p class="text-sm">Hoodie</p>
                        <p class="text-sm pb-1">Ukuran: XL</p>
                        <button class="items-center px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                      </div>
                    </div>
                    <div class="w-full bg-gray-100 h-[10vh] justify-between flex flex-row items-center">
                      <h2 class="px-4 font-medium">Rp 200.000</h2>
                      <div class="px-4 flex flex-row items-center gap-4">
                        <div class="text-sm bg-gray-50 border border-gray-500 bg-white rounded-full py-1 px-2 gap-3 flex flex-row">
                          {quantity() > 1 ? (
                            <button
                              class="rounded-full hover:bg-gray-200 px-1"
                              onClick={decrease}
                            >
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          ) : (
                            <button
                              class="rounded-full hover:text-gray-600 px-1"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          )}

                          <p>{quantity()}</p>

                          <button
                            class="rounded-full hover:bg-gray-200 px-1"
                            onClick={increase}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <input type="checkbox" checked class="w-6 h-6 cursor-pointer accent-black" />
                      </div>
                    </div>
                </div>
                <div class="w-full flex flex-col bg-white rounded border">
                    <div class="w-full flex flex-row h-[30vh]">
                      <img
                        src="/src/public/images/mockup/9.png"
                        alt=""
                        class="object-cover w-1/3 lg:w-1/4"
                      />
                      <div class="w-2/3 lg:w-3/4 p-4 flex-col space-y-1 text-left text-black">
                        <div class="w-full flex flex-row justify-between items-center">
                          <p class="text-lg font-semibold truncate">Hoodie 1.1</p>
                          <p>Stok: 10</p>
                        </div>
                        <p class="text-sm max-w-[160px] lg:max-w-xs line-clamp-2 text-gray-600">Produk ini adalah hoodie keluaran terbaru dari Personal Store yang dirilis tahun 2090 di Summer Vation Paris 2090.</p>
                        <p class="text-sm">Hoodie</p>
                        <p class="text-sm pb-1">Ukuran: XL</p>
                        <button class="items-center px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                      </div>
                    </div>
                    <div class="w-full bg-gray-100 h-[10vh] justify-between flex flex-row items-center">
                      <h2 class="px-4 font-medium">Rp 200.000</h2>
                      <div class="px-4 flex flex-row items-center gap-4">
                        <div class="text-sm bg-gray-50 border border-gray-500 bg-white rounded-full py-1 px-2 gap-3 flex flex-row">
                          {quantity() > 1 ? (
                            <button
                              class="rounded-full hover:bg-gray-200 px-1"
                              onClick={decrease}
                            >
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          ) : (
                            <button
                              class="rounded-full hover:text-gray-600 px-1"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          )}

                          <p>{quantity()}</p>

                          <button
                            class="rounded-full hover:bg-gray-200 px-1"
                            onClick={increase}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <input type="checkbox" checked class="w-6 h-6 cursor-pointer accent-black" />
                      </div>
                    </div>
                </div>
                <div class="w-full flex flex-col bg-white rounded border">
                    <div class="w-full flex flex-row h-[30vh]">
                      <img
                        src="/src/public/images/mockup/9.png"
                        alt=""
                        class="object-cover w-1/3 lg:w-1/4"
                      />
                      <div class="w-2/3 lg:w-3/4 p-4 flex-col space-y-1 text-left text-black">
                        <div class="w-full flex flex-row justify-between items-center">
                          <p class="text-lg font-semibold truncate">Hoodie 1.1</p>
                          <p>Stok: 10</p>
                        </div>
                        <p class="text-sm max-w-[160px] lg:max-w-xs line-clamp-2 text-gray-600">Produk ini adalah hoodie keluaran terbaru dari Personal Store yang dirilis tahun 2090 di Summer Vation Paris 2090.</p>
                        <p class="text-sm">Hoodie</p>
                        <p class="text-sm pb-1">Ukuran: XL</p>
                        <button class="items-center px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs"><span class="text-sm">Ubah</span><i class="fa-solid fa-pencil ml-1"></i></button>
                      </div>
                    </div>
                    <div class="w-full bg-gray-100 h-[10vh] justify-between flex flex-row items-center">
                      <h2 class="px-4 font-medium">Rp 200.000</h2>
                      <div class="px-4 flex flex-row items-center gap-4">
                        <div class="text-sm bg-gray-50 border border-gray-500 bg-white rounded-full py-1 px-2 gap-3 flex flex-row">
                          {quantity() > 1 ? (
                            <button
                              class="rounded-full hover:bg-gray-200 px-1"
                              onClick={decrease}
                            >
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          ) : (
                            <button
                              class="rounded-full hover:text-gray-600 px-1"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          )}

                          <p>{quantity()}</p>

                          <button
                            class="rounded-full hover:bg-gray-200 px-1"
                            onClick={increase}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <input type="checkbox" class="w-6 h-6 cursor-pointer accent-black" />
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="hidden md:block w-2/5 lg:w-1/3 mb-10">
        <div class={`w-full h-[50svh] sticky ${isScrollingUp() ? 'top-20' : 'top-4'} mt-20 bg-gray-100 py-5 px-6`}>
          <h2 class="w-full text-xl font-medium mb-6 mt-2">Rincian pesanan</h2>
          <div class="flex flex-row items-center justify-between mb-3">
            <p class="text-md">Total belanja</p>
            <p class="text-md">Rp 400.000</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3">
            <div class="items-center flex flex-row">
              <p class="text-md">Kode promo</p>
              <button class="ml-1 text-xs px-2 py-1 rounded-full hover:bg-gray-200"><i class="fa-solid fa-plus"></i></button>
            </div>
            <p class="text-md">--</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3">
            <p class="text-md">Total belanja</p>
            <p class="text-md">Rp 400.000</p>
          </div>
          <div class="flex flex-row items-center justify-between mb-3 font-medium border-t border-gray-500 pt-3">
            <p class="text-md">Total harga</p>
            <p class="text-md">Rp 400.000</p>
          </div>
          <button class="w-full rounded-full bg-black text-white py-2 hover:bg-white border border-gray-800 hover:text-black">Proses pesanan</button>
        </div>
      </div>
    </section>
  );
}
