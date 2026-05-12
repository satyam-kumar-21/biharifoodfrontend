const StoryScreen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12">
      <h1 className="text-4xl md:text-5xl font-bold font-hindi text-center text-primary italic">"Taste that reminds you of the village streets"</h1>
      
      <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://res.cloudinary.com/demo/image/upload/v1652345678/village_kitchen.jpg" 
          alt="Traditional Kitchen" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-8 text-lg leading-relaxed text-gray-700">
        <p>
          <span className="text-3xl font-bold text-primary font-hindi">Swaad Bihar Ka</span> started with a small dream - to bring those traditional tastes of Bihar to the world that are gradually getting lost in the crowd of modernity.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-hindi text-primary">Our Roots</h2>
            <p>
              That magic from the hands of our mothers and grandmothers, those spices ground on the stone and food cooked on a low flame on a clay stove. We have tried to weave the same purity and affection into every one of our products.
            </p>
          </div>
          <div className="bg-secondary/10 p-8 rounded-3xl border-2 border-dashed border-secondary">
            <p className="italic font-hindi text-primary-dark">
              "We don't just sell food, we deliver a piece of Bihar's culture and tradition to your home."
            </p>
          </div>
        </div>

        <p>
          Today we are working directly with artisans and self-help groups from different districts of Bihar. Whether it is Tilkut from Gaya, Khaja from Silao or Makhana from Muzaffarpur - we ensure that every bite connects you directly to the soil of Bihar.
        </p>

        <div className="bg-primary text-white p-12 rounded-3xl text-center space-y-4">
          <h2 className="text-3xl font-bold font-hindi">Promise of Purity</h2>
          <p>We do not use any artificial flavors or preservatives.</p>
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;
