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
            style={{ objectFit: 'cover', zIndex: "-1" }}
            alt="Background image"
            priority
          />
        </div>
        <Navbar />
        <div className="z-[-1] relative flex flex-col items-center top-[19vh] text-center">
          <br />
          <h1 className="text-white text-5xl font-bold">Let Us Find the Place of Your Dreams          </h1>
          <p className="text-white text-xl">At Hommyfind, we make it easy to find your perfect PG or rental room in Chandigarh, Mohali, or Panchkula. Just tell us what you’re looking for, and we’ll match you with options that fit your needs. Your dream home is just a few clicks away!
          </p>
          <div>
            <SearchBar onToggleDropdown={undefined} onCityChange={undefined} onChange={undefined} disableRedirect={undefined} searchWidth={"650px"} />
          </div>
        </div>
      </main>
      <div className="font-Quicksand p-10 m-20 text-[##333333] text-center">
        <h2 className="text-3xl font-bold">About Us</h2>
        <hr className="w-48 border-t-4 border-[#FF5C00] my-4 mx-auto" />
        Welcome to Hommyfind – your go-to platform for finding the perfect PG or rental room in Chandigarh, Mohali, and Panchkula. Whether you’re a student or a working professional, we’re here to simplify your search for a comfortable and affordable living space.
        Founded by locals, Hommyfind is dedicated to connecting you with verified listings tailored to your needs. Let us help you find your home away from home in the Tricity area!

      </div>
      <div className="font-Quicksand p-10 m-20 text-[#333333] text-center">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>
        <hr className="w-48 border-t-4 border-[#FF5C00] my-4 mx-auto" />

        <div className="mt-8 space-y-6">
          <p className="text-gray-700">
            <strong>Local Expertise:</strong> Founded by Tricity locals, we understand the area and its unique housing market, ensuring you find the best options tailored to your needs.
          </p>
          <p className="text-gray-700">
            <strong>Verified Listings:</strong> All our PGs and rooms are thoroughly vetted, so you can trust that what you see is what you get – no surprises.
          </p>
          <p className="text-gray-700">
            <strong>User-Friendly Platform:</strong> Our easy-to-use interface makes searching for your ideal living space quick and hassle-free, saving you time and effort.
          </p>
          <p className="text-gray-700">
            <strong>Tailored for You:</strong> Whether you’re a student or a working professional, we offer listings that fit your budget, lifestyle, and preferences.
          </p>
          <p className="text-gray-700">
            <strong>Dedicated Support:</strong> Our team is here to assist you every step of the way, ensuring a smooth and stress-free experience from search to move-in.
          </p>
        </div>
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
        <Footer />
      </div>
    </HouseProvider>
  );
}
