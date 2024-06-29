const UserPage = () => {
  return (
    <div className="min-h-screen p-4 pb-32 pt-16 md:pt-4">
      <div className="pt-6">
        <div className="flex flex-col md:flex-row items-start justify-start gap-5 max-w-full">
          <div className="min-w-[14rem] h-[14rem]">
            <img
              src="https://img.freepik.com/premium-photo/gorilla-wearing-pair-headphones-with-purple-background_962508-4153.jpg"
              alt="Gorilla with headphones"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-lg md:text-3xl text-accent-light mb-4 font-semibold">
              A Shady User
            </h1>
            <p className="text-sm md:text-md text-zinc-300 max-w-full">
              I am Awesome!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
