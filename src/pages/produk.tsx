import { createSignal, onMount, onCleanup } from 'solid-js';
import { A, useLocation, useNavigate  } from '@solidjs/router';

export default function About() {

let revealDiv1: HTMLDivElement | undefined;

    const [showDD1, setShowDD1] = createSignal(false);

    const [showDD2, setShowDD2] = createSignal(false);

    const [showDD3, setShowDD3] = createSignal(false);

    const [showDD4, setShowDD4] = createSignal(false);

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

    const [isScrollingUp2, setIsScrollingUp2] = createSignal(true);
    let lastScrollTop4 = 0;

    onMount(() => {
    const handleScroll = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Deteksi arah scroll
        if (currentScroll < lastScrollTop4) {
        setIsScrollingUp2(true); // Scroll ke atas
        } else {
        setIsScrollingUp2(false); // Scroll ke bawah
        }

        lastScrollTop4 = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
    });

    const [isScrollingDown, setIsScrollingDown] = createSignal(false);

    let lastScrollTop2 = 0;

    onMount(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
            if (currentScroll > lastScrollTop2) {
                setIsScrollingDown(true); // Scroll ke bawah, hilangkan mt-16
            }
    
            lastScrollTop2 = currentScroll <= 0 ? 0 : currentScroll; // Menghindari scroll ke atas mentok
        };
    
        window.addEventListener("scroll", handleScroll);
        onCleanup(() => window.removeEventListener("scroll", handleScroll));
    });

    const [isScrolled, setIsScrolled] = createSignal(false);

    let lastScrollTop3 = 0;

    onMount(() => {
    const handleScroll = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 100) { // Gantilah 100 dengan jarak scroll yang diinginkan
        setIsScrolled(true); // Menampilkan div setelah scroll lebih dari 100px
        }

        lastScrollTop3 = currentScroll <= 0 ? 0 : currentScroll; // Untuk antisipasi scroll ke atas
    };

    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
    });
    
  const [activeImage, setActiveImage] = createSignal("/src/public/images/mockup/1.png");

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

  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1); // Kembali ke halaman sebelumnya
    } else {
      navigate('/'); // Kalau tidak ada history, ke homepage
    }
  }

  return (
    <section class="">
      <div class="flex h-full grid grid-cols-1 md:grid-cols-2">
        <div class="w-full h-full">
            <div class={`fixed left-10 ${isScrollingUp2() ? 'top-24' : 'top-10'} text-xs z-10 px-2 py-1 bg-white transition-all duration-300`}>
                <button onClick={handleBack} class="flex items-center space-x-1">
                    <i class="fa-solid fa-chevron-left"></i>
                    <span class="text-sm">Kembali</span>
                </button>
            </div>
            <div class={`${isScrollingDown() ? 'pt-0' : 'pt-16'} group w-full h-[100vh] top-0 sticky flex items-center justify-center overflow-hidden relative`}>
                <img 
                    src={activeImage()} 
                    alt="" 
                    class={`${isScrollingUp() ? 'mt-28' : 'mt-0'} h-full w-full object-cover transition-all duration-300 ease-in-out`} 
                />

                <div class="absolute z-10 inset-0 bg-black/15 transition-opacity duration-300 opacity-0 md:group-hover:opacity-100"></div>
                
                <div class="absolute z-20 bottom-0 w-full bg-black bg-opacity-50 text-black p-4 transition-all duration-300 opacity-0 md:group-hover:opacity-100">
                    <div class="flex flex-wrap justify-center gap-4">
                        <img 
                            src="/src/public/images/mockup/1.png" 
                            alt="" 
                            onClick={() => setActiveImage("/src/public/images/mockup/1.png")}
                            class="w-[10vh] h-[10vh] object-cover cursor-pointer" 
                        />
                        <img 
                            src="/src/public/images/mockup/9.png" 
                            alt=""
                            onClick={() => setActiveImage("/src/public/images/mockup/9.png")} 
                            class="w-[10vh] h-[10vh] object-cover cursor-pointer"
                        />
                        <img 
                            src="/src/public/images/mockup/11.png" 
                            alt=""
                            onClick={() => setActiveImage("/src/public/images/mockup/11.png")} 
                            class="w-[10vh] h-[10vh] object-cover cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            <div class="w-full block md:hidden relative bg-gray-100 text-black p-4">
                    <div class="flex flex-wrap justify-center gap-4">
                        <img 
                            src="/src/public/images/mockup/1.png" 
                            alt="" 
                            onClick={() => setActiveImage("/src/public/images/mockup/1.png")}
                            class="w-[10vh] h-[10vh] object-cover cursor-pointer" 
                        />
                        <img 
                            src="/src/public/images/mockup/9.png" 
                            alt=""
                            onClick={() => setActiveImage("/src/public/images/mockup/9.png")} 
                            class="w-[10vh] h-[10vh] object-cover cursor-pointer"
                        />
                        <img 
                            src="/src/public/images/mockup/11.png" 
                            alt=""
                            onClick={() => setActiveImage("/src/public/images/mockup/11.png")} 
                            class="w-[10vh] h-[10vh] object-cover cursor-pointer"
                        />
                    </div>
                </div>
        </div>
        <div class="w-full flex justify-center text-center text-sm md:mt-12 py-12 md:py-16 lg:py-28 px-8 md:px-16 lg:px-28 text-black">
            <div class="w-full space-y-3 text-left">
                <div class="flex justify-left w-full">
                    <p class="px-3 py-1 bg-gray-200 rounded">Unisex</p>
                </div>
                <div class="block">
                    <div class="w-full justify-between flex">
                    <h2 class="text-lg font-medium">Hoodie 1.1</h2>
                    <p class="text-md font-medium">4.5/5 <i class="fa-solid fa-star ml-1"></i></p>
                    </div>
                    <p class="text-base">Hoodie</p>
                </div>
                <p class="text-gray-600 line-clamp-2">Produk ini adalah hoodie keluaran terbaru dari Personal Store yang dirilis tahun 2090 di Summer Vation Paris 2090.</p>
                <p class="text-md">Warna: Putih</p>
                <div class="w-full space-y-2">
                    <p class="text-md">Ukuran:</p>
                    <div class="w-full flex flex-wrap text-sm gap-2">
                        <button class="px-4 py-2 border border-gray-600 line-through text-gray-400 items-center rounded-full cursor-default">S</button>
                        <button class="px-4 py-2 border border-gray-600 text-black items-center rounded-full cursor-pointer">M</button>
                        <button class="px-4 py-2 border border-gray-600 text-black items-center rounded-full cursor-pointer">L</button>
                        <button class="px-4 py-2 border border-gray-600 bg-black text-white items-center rounded-full cursor-pointer">XL</button>
                        <button class="px-4 py-2 border border-gray-600 line-through text-gray-400 items-center rounded-full cursor-default">XXL</button>
                    </div>
                </div>
                <p class="text-md">Stok: 10</p>
                <div class="w-full flex gap-3">
                    <button class="w-full py-3 border border-gray-600 bg-black hover:bg-white hover:text-black text-white items-center rounded-full cursor-pointer">Tambah ke keranjang <i class="fa-solid fa-basket-shopping ml-1"></i></button>
                    <button class="w-fit px-4 py-3 border hover:border-white border-gray-600 bg-white hover:bg-red-500 hover:text-white text-black items-center rounded-full cursor-pointer"><i class="fa-solid fa-heart"></i></button>
                </div>
                <div class={`transition-opacity duration-300 ${isScrolled() ? 'opacity-100' : 'opacity-0'} w-full`}>
                    <div class="w-full flex-col border-gray-800 border-b pr-2">
                        <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD1(!showDD1())}>
                        <p class="flex items-center text-md font-medium py-4">
                            Rincian
                        </p>
                        <i
                            class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                            showDD1() ? "rotate-180" : ""
                            }`}
                        ></i>
                        </div>
                        <div class={`${showDD1() ? "block" : "hidden"} space-y-2 pb-4 transition-opacity duration-300`}>
                            <p>Bahan: Katun</p>
                            <p class="text-justify">Nikmati kenyamanan dan gaya dengan hoodie premium kami. Dibuat dari bahan katun berkualitas tinggi, hoodie ini dirancang untuk memberikan kehangatan yang pas dan kelembutan saat digunakan. Desainnya yang sederhana namun modern membuatnya cocok untuk berbagai kesempatan, baik itu untuk hangout bersama teman atau sekadar bersantai di rumah. Dilengkapi dengan tali serut di bagian hoodie dan kantong depan yang praktis, hoodie ini menawarkan fungsionalitas dan kenyamanan sepanjang hari. Dengan berbagai pilihan warna yang stylish, hoodie ini menjadi pilihan sempurna untuk melengkapi koleksi pakaian kasual Anda.</p>
                        </div>
                    </div>
                    <div class="w-full flex-col border-gray-800 border-b pr-2">
                        <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD2(!showDD2())}>
                        <p class="flex items-center text-md font-medium py-4">
                            Ukuran lengkap
                        </p>
                        <i
                            class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                            showDD2() ? "rotate-180" : ""
                            }`}
                        ></i>
                        </div>
                        <div class={`${showDD2() ? "block" : "hidden"} space-y-2 pb-4 transition-opacity duration-300`}>
                            <img src="/src/public/images/charthoodie.jpg" alt="" class="w-full" />
                            <p>Mohon dimaklumi jika ada perbedaan 1-2 CM.</p>
                        </div>
                    </div>
                    <div class="w-full flex-col border-gray-800 border-b pr-2">
                        <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD3(!showDD3())}>
                        <p class="flex items-center text-md font-medium py-4">
                            Ulasan(2)
                        </p>
                        <i
                            class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                            showDD3() ? "rotate-180" : ""
                            }`}
                        ></i>
                        </div>
                        <div class={`${showDD3() ? "block" : "hidden"} space-y-6 pb-4 transition-opacity duration-300`}>
                            <div class="w-full space-y-1">
                                <div class="w-full justify-between flex items-center">
                                    <div class="flex items-center">
                                        <p class="font-medium truncate w-[110px]">Nanda Rahardian</p>
                                        <p class="ml-1">5/5<i class="fa-solid fa-star ml-1"></i></p>
                                    </div>
                                    <p class="text-gray-600">11-11-2090</p>
                                </div>
                                <p class="text-justify text-gray-600 line-clamp-2">Saya sangat terkesan dengan hoodie ini! Bahan yang digunakan sangat nyaman di kulit, dan terasa lembut meskipun saya memakainya sepanjang hari. Desainnya stylish, cocok untuk berbagai kesempatan, baik untuk santai maupun sedikit lebih formal.</p>
                            </div>
                            <div class="w-full space-y-1">
                                <div class="w-full justify-between flex items-center">
                                    <div class="flex items-center">
                                        <p class="font-medium truncate w-[110px]">Reja Rahardian</p>
                                        <p class="ml-1">5/5<i class="fa-solid fa-star ml-1"></i></p>
                                    </div>
                                    <p class="text-gray-600">11-11-2090</p>
                                </div>
                                <p class="text-justify text-gray-600 line-clamp-2">Hoodie ini bagus kualitasnya oke dan pengirimannya cepat dan penjualnya ramah</p>
                            </div>
                            <div class="w-full flex justify-center">
                                <button class="hover:underline">Lebih banyak</button>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex-col border-gray-800 border-b pr-2">
                        <div class="flex items-center justify-between cursor-pointer" onClick={() => setShowDD4(!showDD4())}>
                        <p class="flex items-center text-md font-medium py-4">
                            Info lainnya
                        </p>
                        <i
                            class={`fa-solid fa-chevron-down ml-2 transition-transform duration-300 md:block ${
                            showDD4() ? "rotate-180" : ""
                            }`}
                        ></i>
                        </div>
                        <div class={`${showDD4() ? "block" : "hidden"} space-y-2 pb-4 transition-opacity duration-300`}>
                            <p class="text-justify">Nikmati kenyamanan dan gaya dengan hoodie premium kami. Dibuat dari bahan katun berkualitas tinggi, hoodie ini dirancang untuk memberikan kehangatan yang pas dan kelembutan saat digunakan. Desainnya yang sederhana namun modern membuatnya cocok untuk berbagai kesempatan, baik itu untuk hangout bersama teman atau sekadar bersantai di rumah. Dilengkapi dengan tali serut di bagian hoodie dan kantong depan yang praktis, hoodie ini menawarkan fungsionalitas dan kenyamanan sepanjang hari. Dengan berbagai pilihan warna yang stylish, hoodie ini menjadi pilihan sempurna untuk melengkapi koleksi pakaian kasual Anda.</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
      </div>
      <div
      class="relative w-full h-[80vh] px-6 md:px-8 flex justify-center items-center"
    >
      <div class="w-full flex flex-col justify-center p-4 text-black">
        <h2 class="mb-6 text-xl font-medium lg:font-semibold">
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
        </div>
        </div>
    </section>
  );
}
