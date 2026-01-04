import bg from "../assets/bg.jpg";


const Home = () => (
<div
className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
style={{ backgroundImage: `url(${bg})` }}
>
<div className="absolute inset-0 bg-black/50"></div>
<div className="relative text-center text-white px-6">
<h1 className="text-5xl font-extrabold text-yellow-400">Welcome to FoodieZone 🍔</h1>
<p className="mt-4 text-xl text-gray-200">Delicious food from your favorite restaurants, delivered fast.</p>
</div>
</div>
);


export default Home;