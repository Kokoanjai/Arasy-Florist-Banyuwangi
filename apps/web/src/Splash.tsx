import React from 'react';

export default function Splash() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Organic Background Elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-surface to-surface"></div>

      {/* Abstract Botanical Decorative Shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary-container/10 rounded-full blur-[80px]"></div>

      {/* Content Canvas */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-12">

        {/* Logo & Brand Identity */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-full scale-125 blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-surface-container-lowest rounded-full shadow-[0_4px_24px_rgba(0,101,44,0.06)] flex items-center justify-center p-6">
              <img
                alt="BungaBanyuwangi Logo"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbMVX5d3xD1RbvIGNRTsQlDxqIQsUFyAT0-FZli9HV4RhMMEvLiYfBFIA-GsFtE4jYSusxc2ps_T5E_oxc17y-gBrmnv3i9-k6SMktoJUUjbfkw04zt_cidTQQNbmHurOHS-U8kR2SLEsQayAAkv4M9bS4LxJIfOeTKJLRcQKMNwaUsvK0654L2H0s4rF3BgsxiwOfiRyqYxSaTYM9JTg-OkSIu6OtcJaQxyWMh9tjCEM3sTXQn0_qrPJtwIg31giS3EnPqz1nyDZD"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
              Arasy Florist Banyuwangi
            </h1>
            <p className="font-display text-lg md:text-xl font-semibold text-secondary-container tracking-wide uppercase">
              Menyiapkan Bunga Terbaik di Banyuwangi
            </p>
          </div>
        </div>

        {/* Messaging & Value Proposition */}
        <div className="space-y-4 max-w-xs mx-auto">
          <div className="flex items-center justify-center space-x-2 text-on-surface-variant bg-surface-container-low py-2 px-4 rounded-full">
            <span className="material-symbols-outlined text-primary text-sm">location_on</span>
            <span className="text-sm font-medium tracking-wide">Area Layanan Terkonfirmasi</span>
          </div>
          <p className="text-on-surface-variant leading-relaxed font-medium">
            Kami melayani area <span className="text-primary font-bold">Banyuwangi &amp; sekitarnya</span> dengan hiasan bunga tropis terbaik setiap hari.
          </p>
        </div>

        {/* Primary Action */}
        <div className="w-full pt-8">
          <a className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-primary to-primary-container px-8 py-5 text-white shadow-[0_8px_30px_rgb(0,101,44,0.2)] transition-all duration-300 hover:shadow-[0_8px_35px_rgb(0,101,44,0.3)] hover:-translate-y-0.5 active:scale-95" href="#/home">
            <span className="relative flex items-center gap-2 font-headline font-bold text-lg tracking-wide">
              Lanjutkan
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
          </a>

          <p className="mt-6 text-xs text-outline font-medium tracking-widest uppercase opacity-60">
            Est. 2024 • Handpicked Quality
          </p>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-1/4 -left-12 opacity-20 pointer-events-none md:opacity-40 animate-[pulse_10s_ease-in-out_infinite]">
        <img
          alt="Flower detail"
          className="w-48 h-64 object-cover rounded-full rotate-12 hover:rotate-[15deg] transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Whlk9U3M1Rw1Q3W2UxGMKxOESXeEl-y46zeBoXBSlVhaKl0mmqqBNhapjg-z3Wm4v_A2cfuiWY5L67nALel3mimoakD9zYfPaQTPupIYalvu5hB3Wg8LKbDu1kjPcd52tlEjunpFaFFRII2BFfaqM_Jf2khehw6hWjIV6mISJU4d9TOPDDnVXoQAFP-5vYIRqzeSSdBqjO1n7_v8hCcY1MANqR7K90KBGF57xkZO-sfLhTGHc5lqJEULXM_6xlg-KQzg3kDLdsVr"
        />
      </div>
      <div className="absolute bottom-1/4 -right-20 opacity-20 pointer-events-none md:opacity-30 animate-[pulse_12s_ease-in-out_infinite]">
        <img
          alt="Flower detail"
          className="w-64 h-64 object-cover rounded-full -rotate-12 hover:-rotate-[15deg] transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEoNYnAUvmOQ6tSbrBAZx7BJA5EtWZ-oKpYbm1PC_tCI903csw2qiFTkvDCeFDEPKBZYf9BJYpLTSxU6GHUal0BsjT--K-j6oqiVgbnmihA86UgUBxf6Dsojima5ACQmQYhHPPeEdj1_yWlVDyiJnzEpy39NkauGsDGnzPNy5CGhU3ycQk75Ch4rtA_nDym8NdNI6iGwpPI0BkaEyZjRGKB31Jmbidm-bL5oz1-teNkj4HIo4bCt5FdEPhm8EIwMtBKfaAI-OCeb3S"
        />
      </div>
    </main>
  );
}
