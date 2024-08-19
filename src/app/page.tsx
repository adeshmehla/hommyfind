import Image from "next/image";
import { HouseProvider } from "@/context/context";
import Navbar from "@/components/Navbar";
import home_thumbnail1 from "@/images/home_thumbnail1.jpg";
import house from "@/images/house.jpg";
import house2 from "@/images/house2.jpg";
import house3 from "@/images/house3.jpg";
import house4 from "@/images/house4.jpg";
import house10 from "@/images/house10.jpg";
import SearchBar from '../components/Seachbar'
import PropertyCard from '../components/propertyCard'
import PropertyTypeSection from "@/components/propertyTypeSection";
import GetInTouch from "@/components/Forms/GetInTouch";
import Footer from "@/components/footer";
export default function Home() {
  const properties = [
    {
      id: 1,
      imageUrl: house,
      title: 'Modern Apartment in the City Center',
      description: '2 beds • 2 baths • 1,200 sqft',
    },
    {
      id: 2,
      imageUrl: house2,
      title: 'Cozy Cottage in the Countryside',
      description: '3 beds • 2 baths • 1,800 sqft',
    },
    {
      id: 3,
      imageUrl: house3,
      title: 'Luxury Villa with Private Pool',
      description: '4 beds • 3 baths • 2,500 sqft',
    },
    {
      id: 4,
      imageUrl: house4,
      title: 'Charming House with Garden',
      description: '3 beds • 2 baths • 1,500 sqft',
    },
    {
      id: 4,
      imageUrl: house10,
      title: 'Clean and good PG Room',
      description: '2 beds • 1 baths • 700 sqft',
    }
  ];


  return (
    <HouseProvider>
      <main className="flex min-h-screen flex-col"
      >
        <div>
          <Image
            className="brightness-75"
            src={home_thumbnail1}
            fill
            style={{ objectFit: 'cover',zIndex:"-1" }}
            alt="Background image"
            priority
          />
        </div>
        <Navbar />
        <div className="z-[-1] relative flex flex-col items-center top-[19vh] text-center">
          <br />
          <h1 className="text-white text-5xl font-bold">Find Your Dream Living Space Here</h1>
          <p className="text-white text-xl">Unlock Your Dream Home: Where Every Key Opens a New Chapter</p>
          <div>
            <SearchBar onToggleDropdown={undefined} onCityChange={undefined} onChange={undefined} disableRedirect={undefined} searchWidth={"650px"} />
          </div>
        </div>
      </main>
      <div className="font-Quicksand p-10 m-20 text-[##333333]">
        Lorem ipsum dolor sit amet . The graphic and typographic operators know this well, in reality all the professions dealing with the universe of communication have a stable relationship with these words, but what is it? Lorem ipsum is a dummy text without any sense.
        It is a sequence of Latin words that, as they are positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will subsequently be occupied from ad hoc texts composed by communication professionals.
        It is certainly the most famous placeholder text even if there are different versions distinguishable from the order in which the Latin words are repeated.
      </div>
      <div className="font-Quicksand p-10 m-20 text-[#333333] text-center">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <hr className="w-48 border-t-4 border-[#FF5C00] my-4 mx-auto" />

        <p className="text-gray-700">
          Our property listing platform offers a seamless and intuitive experience, designed with cutting-edge Next.js technology for blazing-fast performance. Whether you're browsing through listings or searching for your dream home, our site ensures a smooth and responsive user experience every step of the way.
        </p>

        <p className="text-gray-700 mt-4">
          Built with Tailwind CSS, our website is not only aesthetically pleasing but also highly customizable, ensuring that your journey in finding the perfect property is as enjoyable as it is efficient. Trust us to provide the best platform for all your property needs.
        </p>
      </div>
      <div className="font-Quicksand p-10 m-20 text-[#333333] text-center">
        <h2 className="text-3xl font-bold">VIEW OUR COMMUNITIES</h2>
        <hr className="w-48 border-t-4 border-[#FF5C00] my-4 mx-auto" />
        <div className="text-gray-700">
          <SearchBar onToggleDropdown={undefined} onCityChange={undefined} onChange={undefined} disableRedirect={undefined} searchWidth={"650px"} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div>
          <PropertyTypeSection />
        </div>
        <div>
          <GetInTouch />
        </div>
      </div>
        <div>
          <Footer/>
        </div>
    </HouseProvider>
  );
}
