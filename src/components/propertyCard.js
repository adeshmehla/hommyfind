"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';  

const PropertyCard = ({ property }) => {
  const router = useRouter();
  const handleMoreDetailsClick = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-transparent bg-clip-padding">
      <div
        className="relative h-64"
        style={{
          borderImage: 'linear-gradient(to right, #FF5C00, #AE0088) 1',
        }}
      >
        <Image
          src={property.imageUrl}
          alt={property.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-700 mb-4">{property.description}</p>
        <button
          onClick={handleMoreDetailsClick}
          className="bg-[#FF5C00] text-white px-4 py-2 rounded-lg"
        >
          More Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
