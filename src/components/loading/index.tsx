export const Loading = () => {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl text-black font-bold">Dashboard de Produtos</h1>
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center py-12"
      >
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary-500/20"></div>
          <p className="text-black text-lg">Carregando dados do dashboard...</p>
          <span className="sr-only">
            Por favor, aguarde enquanto os dados são carregados
          </span>
        </div>
      </div>
    </section>
  );
};
