import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
  const navigations = ["Trumpet", "Guitar", "Saxophone", "Piano", "Guitar"];

  return (
    <div
      className="bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
      }}
    >
      <NavBar navigation={navigations} />
      <div className="flex align-center">
        <nav className="h-[89vh] w-48 hidden items-center md:flex">
          <div className="flex-1 ml-10 p-2 w-auto h-auto">
            <ul className="flex flex-col">
              {navigations.map((nav, index) => (
                <li key={index} className="my-6 font-semibold text-xl">
                  {nav}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="w-screen grid grid-cols-1 justify-items-center items-center grid-flow-row gap-4 mx-2 my-4 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
