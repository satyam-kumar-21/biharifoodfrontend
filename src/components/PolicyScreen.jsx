const PolicyScreen = ({ title, content }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-bold font-hindi border-b-4 border-primary inline-block pb-2">{title}</h1>
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {content}
      </div>
    </div>
  );
};

export default PolicyScreen;
