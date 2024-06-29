const ErrorPage = () => {
  return (
    <div className="bg-zinc-900 min-h-screen p-4">
      <div className="flex flex-col min-h-[25rem] items-center justify-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-zinc-300">An error occurred. Page Not Found!</p>
      </div>
    </div>
  );
};

export default ErrorPage;
