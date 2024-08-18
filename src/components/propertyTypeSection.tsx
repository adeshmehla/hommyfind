const PropertyTypeSection = () => {
    const propertyTypes = [
      {
        title: 'Residential',
        description: 'Find your perfect home in a variety of residential properties.',
      },
      {
        title: 'Commercial',
        description: 'Explore commercial spaces for your business needs.',
      },
      {
        title: 'Workshop',
        description: 'Workshops and industrial spaces available for various purposes.',
      },
      {
        title: 'Single Room',
        description: 'Single room accommodations for simple living solutions.',
      },
      {
        title: 'Retail',
        description: 'Spaces available for retail stores and shops.',
      },
      {
        title: 'Land',
        description: 'Plots of land available for various types of development.',
      },
    ];
  
    return (
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Property Types</h2>
          <hr className="w-24 border-t-4 border-[#FF5C00] mx-auto my-4" />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
          {propertyTypes.map((type, index) => (
            <div
              key={index}
              className="border border-gray-300 p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300 h-60"
            >
              <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default PropertyTypeSection;
  