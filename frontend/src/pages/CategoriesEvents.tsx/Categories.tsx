import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {categories.map((cat) => (
         <div
  key={cat.id}
  onClick={() => navigate(`/events/${cat.id}`)}
  className="cursor-pointer bg-white shadow-lg p-4 rounded-xl hover:shadow-2xl transition-all duration-300"
>
  {cat.image && (
//  <img
//   src={`http://127.0.0.1:8000/storage/${cat.image}`} 
//   className="w-full h-56 object-cover"
// />
<img
  src={`http://127.0.0.1:8000/upload/catogories/${cat.image}`} 
 />
  )}

  <h2 className="font-bold text-lg mb-1">{cat.name}</h2>
  <p className="text-sm text-gray-500">{cat.description}</p>
</div>
        ))}
      </div>
    </div>
  );
}